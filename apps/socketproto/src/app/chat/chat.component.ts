import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data-service.service';
import { CustomsocketService } from '../customsocket/customsocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sockets-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private customSocket: CustomsocketService
  ) { }

  public rooms = [];
  public activeRoom;
  public chatMessages: string[] = [];
  public newJoin = false;


  chatForm = this.fb.group({
    newMsg: ['', Validators.required]
  });

  public initializeSocket() {
    this.customSocket.initializeSocket();
    this.initializeSubscriptions();
  }

  private initializeSubscriptions() {
    this.customSocket.getChats()
      .subscribe((msg) => {
        this.chatMessages.push(msg.message);
      });
    this.customSocket.getErrors()
      .subscribe((err) => console.log(err));
    this.customSocket.participantJoined()
      .subscribe(() => this.notifyJoin());
    this.customSocket.onConnect()
      .subscribe(() => console.log('connected'));
    this.customSocket.onDisconnect()
      .subscribe(()=> console.log('disconnected'));
  }

  public closeSocket() {
    this.customSocket.closeSocket();
  }

  public openSocket() {
    this.customSocket.openSocket();
  }

  public submitMsg() {
    const newMsg = this.chatForm.get('newMsg').value;
    this.customSocket.sendMsg(newMsg);
    this.chatMessages.push(newMsg);
    this.chatForm.get('newMsg').setValue('');
  }

  public joinRoom(room) {
    this.customSocket.joinRoom(room)
      .then(() => {
        this.activeRoom = room;
      })
      .catch(err => console.log(err));
  }

  public leaveRoom() {
    this.customSocket.leaveRoom(this.activeRoom);
  }

  public notifyJoin() {
    this.newJoin = true;
    setTimeout(() => { this.newJoin = false}, 5000);
  }

  private isLoggedIn() {
    const token = this.dataService.getToken();
    if (!token) {
      this.router.navigateByUrl('login');
    }
  }

  ngOnInit(): void {

    this.isLoggedIn();

    this.initializeSocket();

    /*
    this.customSocket.getErrors()
      .subscribe(err => {
        console.log(err);
      });

    this.customSocket.onConnect()
      .subscribe(() => {
        console.log('connected');
      });

    this.customSocket.onDisconnect()
      .subscribe(() => {
        console.log('disconnect');
      });

    this.customSocket.participantJoined()
      .subscribe(data => {
        this.notifyJoin();
      });

    this.customSocket.getChats()
      .subscribe((data) => {
        this.chatMessages.push(data.message);
      });

    */

    this.dataService.getRooms()
      .then((rooms) => {
        this.rooms = rooms;
      })
      .catch(err => console.log(err));

  }

}
