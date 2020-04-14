import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data-service.service';
import { CustomsocketService } from '../customsocket/customsocket.service';

@Component({
  selector: 'sockets-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private customSocket: CustomsocketService
  ) { }

  public rooms = [];
  public activeRoom;
  public chatMessages: string[] = [];


  chatForm = this.fb.group({
    newMsg: ['', Validators.required]
  });

  public submitMsg() {
    const newMsg = this.chatForm.get('newMsg').value;
    this.customSocket.sendMsg(newMsg);
    this.chatMessages.push(newMsg);
    this.chatForm.get('newMsg').setValue('');
  }

  public joinRoom(room) {
    console.log(room);
    this.customSocket.joinRoom(room);
    this.activeRoom = room;
  }

  public leaveRoom() {
    this.customSocket.leaveRoom(this.activeRoom);
  }

  ngOnInit(): void {

    this.customSocket.getChats()
      .subscribe((data) => {
        console.log(data);
        this.chatMessages.push(data.message);
      });

    this.dataService.getRooms()
      .then((rooms) => {
        console.log(rooms);
        this.rooms = rooms;
      })
      .catch(err => console.log(err));
  }

}
