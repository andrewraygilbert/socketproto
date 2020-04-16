import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { DataService } from './../data-service.service';
import { Observable, from, fromEvent } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { BASE_URL } from './../constants/api-base-url.constant';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class CustomsocketService {

  public socket;

  private baseUrl = BASE_URL;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {
    const token = this.getToken();
    this.socket = io(`${this.baseUrl}?token=${token}`);
  }

  public getToken(): string {
    return this.storage.getItem('proto_access_token');
  }

  public getChats(): Observable<any> {
    return fromEvent(this.socket.on(), 'chatmsg');
  }

  public getErrors(): Observable<any> {
    return fromEvent(this.socket.on(), 'error');
  }

  public participantJoined(): Observable<any> {
    return fromEvent(this.socket.on(), 'participant_joined');
  }

  public onConnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'connect');
  }

  public onDisconnect(): Observable<any> {
    return fromEvent(this.socket.on(), 'disconnect');
  }

  public async joinRoom(room): Promise<any> {
    await this.socket.emit('joinroom', room, (msg) => { console.log('room has been joined per ack', msg)});
  }

  public async leaveRoom(room) {
    this.socket.emit('leave_room', room);
  }

  public async sendMsg(msg) {
    this.socket.emit('chatmsg', msg);
  }

}
