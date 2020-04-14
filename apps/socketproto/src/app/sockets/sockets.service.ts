import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketsService implements OnInit {

  constructor(
    // private socket: Socket
  ) { }

  /*
  public sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  public getConnection(): Promise<any> {
    return this.socket.fromOneTimeEvent('connect');
  }

  public getDisconnection(): Promise<any> {
    return this.socket.fromOneTimeEvent('disconnection');
  }

  public getTesting(): Promise<any> {
    return this.socket.fromOneTimeEvent('testmessage');
  }

  public joinRoom(room: string) {
    this.socket.emit('joinroom', {room: room});
  }

  public getRoomJoined(): Observable<any> {
    return this.socket
      .fromEvent('roomjoined')
  }

  public chatMessage(body) {
    this.socket.emit('chatmsg', body);
  }

  public getChatMessage(): Observable<any> {
    return this.socket
      .fromEvent('chatmsg')
  }
  */

  ngOnInit() {
  }


}
