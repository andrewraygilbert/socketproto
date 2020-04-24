import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket } from '@nestjs/websockets';
import { User, Room } from '@sockets/api-interfaces';
import { RoomsService } from './../rooms/rooms.service';
import { JwtServicer } from './../auth/jwt/jwt.service';
import { Socket, Server } from 'socket.io';

interface BroadcastInfo {
  room: string;
  event: string;
  response: any;
}

@WebSocketGateway({ pingTimeout: 30000})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(
    private roomsService: RoomsService,
    private jwtServicer: JwtServicer
  ) {}

  /**
   * HANDLE SOCKET CONNECTION
   */

  async handleConnection(socket: Socket) {
    console.log('*** SOCKET CONNECTED ***');
    // hook onto the disconnecting even to notify rooms
    // that a socket has disconnected
    socket.on('disconnecting', (reason) => {
      this.leaveRoom(socket);
    });
  }

  /**
   * HANDLE SOCKET DISCONNECTION
   */

  async handleDisconnect(socket: Socket) {
    console.log('~~~ SOCKET DISCONNECTED ~~~');
  }

  /**
   * RECEIVING/BROADCASTING CHAT MESSAGES
   */

  @SubscribeMessage('chatmsg')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket): void {
    const room = this.getRoomFromSocket(socket);
    this.broadcastToRoom(socket, {
      'room' : room,
      'event' : 'chatmsg',
      'response' : {
        'message' : body
      }
    });
  }

  /**
   * JOINING/LEAVING ROOMS
   */

  // authenticates and retrieves user; retrieves requested room;
  // removes user from current room; joins new room
  @SubscribeMessage('joinroom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<any> {
    const user = await this.jwtServicer.verify(socket);
    const requestedRoom = await this.roomsService.getRoomById(data._id);
    if (!this.verifyCollaborator(user, requestedRoom)) {
      socket.emit('err', {'err' : 'You cannot join this room'});
      return;
    }
    if (this.getRoomFromSocket(socket)) {
      this.leaveRoom(socket);
    }
    this.doJoinRoom(socket, requestedRoom, user);
  }

  // verify user is authorized collaborator in room
  private verifyCollaborator(user: User, room: Room) {
    return room.collaborators.find((collaborator) => collaborator.userId == user._id);
  }

  // joins room; broadcasts join event to other sockets in room;
  // retrieves list of users in room; confirms room join to socket
  private async doJoinRoom(socket: Socket, room: Room, user: User) {
    socket.join(room._id);
    this.broadcastToRoom(socket, {
      'room' : room._id,
      'event' : 'other_joined_room',
      'response' : {
        'message' : 'Someone has joined.',
        'user' : user
      }
    });
    await this.roomsService.addActiveUser(user, room._id);
    const activeUsers = await this.roomsService.getActiveUsers(room._id);
    socket.emit('joined_room', {
      'msg' : 'You joined the room.',
      'room' : room,
      'activeUsers' : activeUsers
    });
  }

  // notify room that socket is leaving; socket leaves room;
  // remove user from list of active users in room
  private async leaveRoom(socket: Socket) {
    const room = this.getRoomFromSocket(socket);
    const user = await this.getUserFromSocket(socket);
    this.broadcastToRoom(socket, {
      room: room,
      event: 'other_exited_room',
      response: {
        message: 'someone left',
        user: user
      }
    });
    socket.leave(room);
    this.roomsService.removeActiveUser(user._id, room);
  }

  /**
   * GENERIC HELPER FUNCTIONS
   */

  private broadcastToRoom(socket: Socket, data: BroadcastInfo) {
    socket.broadcast.to(data.room).emit(data.event, data.response);
  }

  private getRoomFromSocket(socket: Socket): string {
    return Object.keys(socket.rooms)[1];
  }

  private async getUserFromSocket(socket: Socket): Promise<User> {
    return this.jwtServicer.verify(socket);
  }
}
