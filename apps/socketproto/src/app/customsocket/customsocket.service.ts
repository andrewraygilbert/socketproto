import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { DataService } from './../data-service.service';
import { Observable, from, fromEvent } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { BASE_URL } from './../constants/api-base-url.constant';

type ObservableFx = () => Observable<any>;

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class CustomsocketService {

  public socket;
  public getChats: ObservableFx;
  public getErrors: ObservableFx;
  public participantJoined: ObservableFx;
  public onConnect: ObservableFx;
  public onDisconnect: ObservableFx;
  public roomJoined: ObservableFx;

  private baseUrl = BASE_URL;

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {}

  public getToken(): string {
    return this.storage.getItem('proto_access_token');
  }

  public initializeSocket() {
    this.socket = io(this.baseUrl, { query: {
      token: this.getToken()
    }});
    this.initializeSocketMethods();
  }

  private initializeSocketMethods() {
    this.getChats = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'chatmsg');
    };
    this.getErrors = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'err');
    };
    this.participantJoined = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'participant_joined');
    };
    this.onConnect = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'connect');
    };
    this.onDisconnect = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'disconnect');
    };
    this.roomJoined = (): Observable<any> => {
      return fromEvent(this.socket.on(), 'room_joined');
    };
  }

  public closeSocket() {
    console.log('closing the socket', this.socket);
    this.socket.close();
  }

  public openSocket() {
    console.log('the token now', this.getToken());
    console.log('opening the socket', this.socket);
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

}
