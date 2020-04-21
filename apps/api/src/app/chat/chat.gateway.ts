import { UseGuards, UseFilters } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException, MessageBody, ConnectedSocket, BaseWsExceptionFilter } from '@nestjs/websockets';
import { User } from '@sockets/api-interfaces';
import { RoomsService } from './../rooms/rooms.service';
import { JwtServicer } from './../auth/jwt/jwt.service';
import { Socket } from 'net';

@WebSocketGateway({ pingTimeout: 30000})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  constructor(
    private roomsService: RoomsService,
    private jwtServicer: JwtServicer
  ) {}


  private broadcastToRoom(socket, data) {
    socket.broadcast.to(data.room).emit(data.event, data.response);
  }

  private getRoomFromSocket(socket): string {
    return Object.keys(socket.rooms)[1];
  }

  private async getUserFromSocket(socket): Promise<User> {
    return this.jwtServicer.verify(socket.handshake.query.token);
  }

  private async leaveRoom(socket) {
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

  async handleConnection(socket) {
    console.log('*** SOCKET CONNECTED ***');
    socket.on('disconnecting', async (reason) => {
      this.leaveRoom(socket);
    });
  }

  async handleDisconnect(client: any) {
    console.log('~~~ SOCKET DISCONNECTED ~~~');
  }

  @SubscribeMessage('chatmsg')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: any): any {
    for (const room of Object.keys(client.rooms)) {
      client.broadcast.to(room).emit('chatmsg', { 'message' : body });
    }
  }

  checkForToken(client: any): boolean {
    if (client.handshake.query.token) {
      return true;
    }
    throw new WsException('no token set');
  }

  @SubscribeMessage('joinroom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: any): Promise<any> {
    this.checkForToken(client);
    const user = await this.jwtServicer.verify(client.handshake.query.token);
    const requestedRoom = await this.roomsService.getRoomById(data._id);
    const isCollaborator = requestedRoom.collaborators.find(person => person.userId == user._id);
    if (isCollaborator) {
      if (this.getRoomFromSocket(client)) {
        this.leaveRoom(client);
      }
      client.join(requestedRoom._id);
      await this.roomsService.addActiveUser(user, requestedRoom._id);
      client.broadcast.to(requestedRoom._id).emit('other_joined_room', { 'message' : 'Someone has joined.', 'user' : user });
      const activeUsers = await this.roomsService.getActiveUsers(requestedRoom._id);
      client.emit('joined_room', {
        'msg' : 'You joined the room.',
        'room' : requestedRoom,
        'activeUsers' : activeUsers
      });
    } else {
      console.log('user is not allowed to access room');
      client.emit('err', {'err' : 'You cannot join this room.'});
    }

  }

}
