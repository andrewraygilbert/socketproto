import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException } from '@nestjs/websockets';
import { User } from '@sockets/api-interfaces';
import { RoomsService } from './../rooms/rooms.service';
import { JwtServicer } from './../auth/jwt/jwt.service';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  constructor(
    private roomsService: RoomsService,
    private jwtServicer: JwtServicer
  ) {}


  async handleConnection(socket) {
    if (!socket.handshake.query.token) {
      throw new WsException('missing token');
    }
    const user: User = await this.jwtServicer.verify(
      socket.handshake.query.token
    );
    console.log('a socket connected');
    socket.emit('user', {user: user});
  }

  async handleDisconnect(socket) {
    console.log('a socket disconnected');
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
