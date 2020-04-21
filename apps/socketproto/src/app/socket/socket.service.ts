import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { BASE_URL } from '../constants/api-base-url.constant';
import { BROWSER_STORAGE } from '../constants/browser-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

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

}
