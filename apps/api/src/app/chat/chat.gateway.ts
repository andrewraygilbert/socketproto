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
    console.log('*** SOCKET CONNECTED ***')
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
  }

  private doLeaveRoom(client: any) {
    if (Object.keys(client.rooms).length > 1) {
      console.log('in keys', client.rooms);
      client.leave(Object.keys(client.rooms)[1]);
    }
  }

  @SubscribeMessage('joinroom')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: any): Promise<any> {
    this.doLeaveRoom(client);
    const user = await this.jwtServicer.verify(client.handshake.query.token);
    const requestedRoom = await this.roomsService.getRoomById(data._id);
    const isCollaborator = requestedRoom.collaborators.find(person => person.userId == user._id);
    if (isCollaborator) {
      client.join(requestedRoom._id);
      client.broadcast.to(requestedRoom._id).emit('participant_joined', { 'message' : 'Someone has joined.' });
    } else {
      console.log('user is not allowed to access room');
      return {'msg' : 'cant do that'};
    }
    return {'msg' : 'success'};
  }

}
