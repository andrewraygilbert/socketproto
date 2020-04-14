import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, WsException, MessageBody, ConnectedSocket } from '@nestjs/websockets';
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


    console.log('*** SOCKET CONNECTED ***')
    console.log({"user" : user});
    socket.emit('testmessage', {
      testing: 'Here is the test information'
    });
  }

  async handleDisconnect(socket) {
    console.log('~~~ SOCKET DISCONNECTED ~~~');
  }


  @SubscribeMessage('chatmsg')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: any): any {
    console.log(body);
    for (const room of Object.keys(client.rooms)) {
      client.broadcast.to(room).emit('chatmsg', { 'message' : body });
    }
    // client.broadcast.to('5e923b1494ec4e1d389cab80').emit('chatmsg', {'message' : body});
  }

  @SubscribeMessage('leave_room')
  async leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: any): Promise<any> {
    console.log('leave room');
    console.log(client.rooms);
  }

  @SubscribeMessage('joinroom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: any): Promise<any> {
    if (Object.keys(client.rooms).length > 1) {
      console.log('in keys', client.rooms);
      client.leave(Object.keys(client.rooms)[1]);
    }
    const requestedRoom = await this.roomsService.getRoomById(data._id);
    client.join(requestedRoom._id);
    console.log('joining room: ', requestedRoom._id);
    client.broadcast.to(requestedRoom._id).emit('roomjoined', {'message' : 'Someone has joined'});
    console.log('rooms', client.rooms);
  }

}
