import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@sockets/api-interfaces';
import { FormBuilder } from '@angular/forms';
import { SocketsService } from './sockets/sockets.service';
import { CustomsocketService } from './customsocket/customsocket.service';

@Component({
  selector: 'sockets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private socketService: SocketsService,
    private customSocket: CustomsocketService
    ) {}

    ngOnInit() {
      /*
      this.socketService.getConnection()
        .then(arg => {
          console.log('connected', arg);
        })
        .catch(err => console.log(err));
      this.socketService.getDisconnection()
        .then(() => {
          console.log('disconnected');
        })
        .catch((err) => console.log(err));
      this.socketService.getTesting()
        .then(arg => {
          console.log('test receipt', arg);
        })
        .catch(err => console.log(err));
      this.socketService.getRoomJoined()
        .subscribe((msg) => console.log(msg));
      this.socketService.getChatMessage()
        .subscribe((data) => console.log(data));
      this.socketService.joinRoom('12345');
      this.socketService.chatMessage({'room' : '12345', 'message' : 'Hello Friends'});
      */
    }

}
