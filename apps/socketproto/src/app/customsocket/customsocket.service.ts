import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
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


  private socketEvents = [{
    methodName: 'getChats',
    eventName: 'chatmsg'
  },{
    methodName: 'getErrors',
    eventName: 'err'
  },{
    methodName: 'onConnect',
    eventName: 'connect'
  },{
    methodName: 'onDisconnect',
    eventName: 'disconnect'
  },{
    methodName: 'participantJoined',
    eventName: 'participant_joined'
  },{
    methodName: 'roomJoined',
    eventName: 'room_joined'
  }];

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
    this.createEventMethods(this.socketEvents);
  }

  // generate methods that return observables for socket events
  private createEventMethods(events) {
    for (const event of events) {
      this[event.methodName] = (): Observable<any> => {
        return fromEvent(this.socket.on(), event.eventName);
      };
    }
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

}
