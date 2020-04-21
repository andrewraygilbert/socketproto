import { UseGuards, UseFilters } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException, MessageBody, ConnectedSocket, BaseWsExceptionFilter } from '@nestjs/websockets';
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

  private broadcastToRoom(socket: Socket, data: BroadcastInfo) {
    socket.broadcast.to(data.room).emit(data.event, data.response);
  }

  private getRoomFromSocket(socket: Socket): string {
    return Object.keys(socket.rooms)[1];
  }

  private async getUserFromSocket(socket: Socket): Promise<User> {
    return this.jwtServicer.verify(socket.handshake.query.token);
  }

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

  async handleConnection(socket: Socket) {
    console.log('*** SOCKET CONNECTED ***');
    socket.on('disconnecting', (reason) => {
      this.leaveRoom(socket);
    });
  }

  async handleDisconnect(socket: Socket) {
    console.log('~~~ SOCKET DISCONNECTED ~~~');
  }

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

  checkForToken(socket: Socket): boolean {
    if (socket.handshake.query.token) {
      return true;
    }
    throw new WsException('no token set');
  }

  private verifyCollaborator(user: User, room: Room) {
    return room.collaborators.find((collaborator) => collaborator.userId == user._id);
  }

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

  @SubscribeMessage('joinroom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<any> {
    this.checkForToken(socket);
    const user = await this.jwtServicer.verify(socket.handshake.query.token);
    const requestedRoom = await this.roomsService.getRoomById(data._id);
    if (this.verifyCollaborator(user, requestedRoom)) {
      if (this.getRoomFromSocket(socket)) {
        this.leaveRoom(socket);
      }
      this.doJoinRoom(socket, requestedRoom, user);
      // socket.join(requestedRoom._id);
      // await this.roomsService.addActiveUser(user, requestedRoom._id);
      // socket.broadcast.to(requestedRoom._id).emit('other_joined_room', { 'message' : 'Someone has joined.', 'user' : user });
      // const activeUsers = await this.roomsService.getActiveUsers(requestedRoom._id);
      // socket.emit('joined_room', {
        // 'msg' : 'You joined the room.',
       //  'room' : requestedRoom,
        // 'activeUsers' : activeUsers
     // });
      return;
    }
    socket.emit('err', {'err' : 'You cannot join this room.'});
    return;
  }

}
