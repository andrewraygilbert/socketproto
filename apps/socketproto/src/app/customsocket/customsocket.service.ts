import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { DataService } from './../data-service.service';
import { Observable, from, fromEvent } from 'rxjs';
import { BASE_URL } from './../constants/api-base-url.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomsocketService {

  public socket;

  private baseUrl = BASE_URL;

  constructor(
    private dataService: DataService
  ) {
    const token = this.dataService.getToken();
    this.socket = io(`${this.baseUrl}?token=${token}`);
  }

  public getChats(): Observable<any> {
    return fromEvent(this.socket.on(), 'chatmsg');
  }

  public async joinRoom(room) {
    this.socket.emit('joinroom', room);
  }

  public async leaveRoom(room) {
    this.socket.emit('leave_room', room);
  }

  public async sendMsg(msg) {
    this.socket.emit('chatmsg', msg);
  }

}
