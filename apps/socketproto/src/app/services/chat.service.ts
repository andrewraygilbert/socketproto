import { Injectable } from '@angular/core';
import { SocketService } from './../socket/socket.service';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socketService: SocketService,
  ) { }

  public getChats(): Observable<any> {
    return fromEvent(this.socketService.socket.on(), 'chatmsg');
  }

  public joinedRoom(): Observable<any> {
    return fromEvent(this.socketService.socket.on(), 'joined_room');
  }

  public otherExitedRoom(): Observable<any> {
    return fromEvent(this.socketService.socket.on(), 'other_exited_room');
  }

  public otherJoinedRoom(): Observable<any> {
    return fromEvent(this.socketService.socket.on(), 'other_joined_room');
  }

  public joinRoom(room): void {
    this.socketService.socket.emit('joinroom', room);
  }

  public async leaveRoom(room) {
    this.socketService.socket.emit('leave_room', room);
  }

  public async sendMsg(msg) {
    this.socketService.socket.emit('chatmsg', msg);
  }

}
