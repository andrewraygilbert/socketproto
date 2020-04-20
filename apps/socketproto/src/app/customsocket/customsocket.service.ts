import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { BASE_URL } from './../constants/api-base-url.constant';
import { BROWSER_STORAGE } from './../constants/browser-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomsocketService {

  public socket;
  private baseUrl = BASE_URL;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) { }

  public getToken(): string {
    return this.storage.getItem('proto_access_token');
  }

  // create a socket connection to the server with auth token
  public initializeSocket() {
    this.socket = io(this.baseUrl, {
      query: {
        token: this.getToken()
      }
    });
  }

  public onConnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'connect');
  }

  public onDisconnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'disconnect');
  }

  public joinedRoom(): Observable<any> {
    return fromEvent(this.socket.on(), 'joined_room');
  }

  public otherExitedRoom(): Observable<any> {
    return fromEvent(this.socket.on(), 'other_exited_room');
  }

  public otherJoinedRoom(): Observable<any> {
    return fromEvent(this.socket.on(), 'other_joined_room');
  }

  public getChats(): Observable<any> {
    return fromEvent(this.socket.on(), 'chatmsg');
  }

  public onError(): Observable<any> {
    return fromEvent(this.socket.on(), 'err');
  }

  public closeSocket() {
    console.log('closing the socket', this.socket);
    this.socket.close();
  }

  public openSocket() {
    console.log('opening the socket');
    this.socket.open(`${this.baseUrl}?token=${this.getToken()}`);
  }

  public joinRoom(room): void {
    this.socket.emit('joinroom', room);
  }

  public async leaveRoom(room) {
    this.socket.emit('leave_room', room);
  }

  public async sendMsg(msg) {
    this.socket.emit('chatmsg', msg);
  }

  public alertDisconnect() {
    console.log('in alert disconnect on socket');
    this.socket.emit('user_disconnect', {});
  }

}
