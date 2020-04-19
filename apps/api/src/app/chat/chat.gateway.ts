import { UseGuards, UseFilters } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException, MessageBody, ConnectedSocket, BaseWsExceptionFilter } from '@nestjs/websockets';
import { User } from '@sockets/api-interfaces';
import { RoomsService } from './../rooms/rooms.service';
import { JwtServicer } from './../auth/jwt/jwt.service';
import { Socket } from 'net';
import { request } from 'http';

@WebSocketGateway({ pingTimeout: 30000})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  constructor(
    private roomsService: RoomsService,
    private jwtServicer: JwtServicer
  ) {}


  async handleConnection(socket) {
    console.log('*** SOCKET CONNECTED ***')
    /*
    socket.on('error', (err) => {
      socket.emit('err', {'message' : err});
    });
    */
  }

  async handleDisconnect(client: any) {
    this.checkForToken(client);
    const user = await this.jwtServicer.verify(client.handshake.query.token);
    console.log('~~~ SOCKET DISCONNECTED ~~~');
    this.doLeaveRoom(client, user);
  }


  @SubscribeMessage('chatmsg')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: any): any {
    for (const room of Object.keys(client.rooms)) {
      client.broadcast.to(room).emit('chatmsg', { 'message' : body });
    }
  }

  private async doLeaveRoom(client: any, user?: User) {
    if (Object.keys(client.rooms).length > 1) {
      const roomId = Object.keys(client.rooms)[1];
      client.broadcast.to(roomId).emit('left_room', { 'message' : 'someone left', 'user' : user });
      client.leave(roomId);
      await this.roomsService.removeActiveUser(user._id, roomId);
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
      await this.doLeaveRoom(client, user);
      client.join(requestedRoom._id);
      await this.roomsService.addActiveUser(user, requestedRoom._id);
      client.broadcast.to(requestedRoom._id).emit('participant_joined', { 'message' : 'Someone has joined.', 'user' : user });
      const activeUsers = await this.roomsService.getActiveUsers(requestedRoom._id);
      client.emit('room_joined', {
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
