import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data-service.service';
import { CustomsocketService } from '../customsocket/customsocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sockets-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService,
    private customSocket: CustomsocketService
  ) { }

  public rooms = [];
  public activeRoom;
  public chatMessages = [];
  public newJoin = false;
  public displayError = false;
  public errorMessage: string;
  public activeUsername: string;
  public newLeave = false;
  public leaver = '';
  public joiner = '';
  public activeUsers = [];


  chatForm = this.fb.group({
    newMsg: ['', Validators.required]
  });

  public initializeSocket() {
    this.customSocket.initializeSocket();
    this.initializeSubscriptions();
  }

  public displayErrors(err) {
    this.errorMessage = err;
    this.displayError = true;
    setTimeout(() => {
      this.displayError = false
    }, 5000);
  }

  private initializeSubscriptions() {
    this.customSocket.getChats()
      .subscribe((msg) => {
        if (this.chatMessages.length > 3) {
          this.chatMessages.shift();
        }
        this.chatMessages.push(msg.message);
      });
    this.customSocket.getErrors()
      .subscribe((response) => {
        console.log(response);
        this.displayErrors(response.err);
      });
    this.customSocket.participantJoined()
      .subscribe((response) => {
        this.notifyJoin(response.user.username);
        this.activeUsers.push(response.user);
      });
    this.customSocket.onConnect()
      .subscribe(() => console.log('connected'));
    this.customSocket.onDisconnect()
      .subscribe(()=> console.log('disconnected'));
    this.customSocket.roomJoined()
      .subscribe((response) => {
        console.log(response);
        this.activeRoom = response.room;
        this.activeUsers = response.activeUsers;
      });
    this.customSocket.roomLeft()
      .subscribe(response => {
        console.log(response);
        this.notifyLeft(response.user.username);
        const index = this.activeUsers.findIndex(eachUser => eachUser.userId == response.user._id);
        this.activeUsers.splice(index, 1);
      })
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
    if (this.chatMessages.length > 3) {
      this.chatMessages.shift();
    }
    this.chatMessages.push(newMsg);
    this.chatForm.get('newMsg').setValue('');
  }

  public joinRoom(room) {
    this.customSocket.joinRoom(room);
  }

  public leaveRoom() {
    this.customSocket.leaveRoom(this.activeRoom);
  }

  public notifyJoin(username) {
    this.joiner = username;
    this.newJoin = true;
    setTimeout(() => { this.newJoin = false}, 5000);
  }

  public notifyLeft(username) {
    this.leaver = username;
    this.newLeave = true;
    setTimeout(() => { this.newLeave = false }, 5000);
  }

  private isLoggedIn() {
    const token = this.dataService.getToken();
    if (!token) {
      this.router.navigateByUrl('login');
    }
  }

  public getActiveUsername(): string {
    return this.dataService.getActiveUsername();
  }

  ngOnInit(): void {

    this.dataService.getUserInfo();

    this.isLoggedIn();

    this.initializeSocket();

    this.dataService.getRooms()
      .then((rooms) => {
        this.rooms = rooms;
      })
      .catch(err => console.log(err));

  }

  ngOnDestroy(): void {
  }

}
