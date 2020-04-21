import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data-service.service';
import { SocketService } from './../socket/socket.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

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
    private socketService: SocketService,
    private chatService: ChatService
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

  // creates a socket connection to the server
  public initializeSocket() {
    this.socketService.initializeSocket();
    this.initializeSubscriptions();
  }

  public displayErrors(err) {
    this.errorMessage = err;
    this.displayError = true;
    setTimeout(() => {
      this.displayError = false
    }, 5000);
  }

  // subscribes to socket events
  private initializeSubscriptions() {

    this.socketService.onConnect()
      .subscribe(() => console.log('*** SOCKET CONNECTED ***'));

    this.socketService.onDisconnect()
      .subscribe(() => console.log('~~~ SOCKET DISCONNECTED ~~~'));

    this.socketService.onError()
      .subscribe((response) => {
        this.displayErrors(response.err);
        console.log(response.err);
      });

    // confirms that user successfully joined a room and updates state
    this.chatService.joinedRoom()
      .subscribe((response) => {
        console.log(response);
        this.activeRoom = response.room;
        this.activeUsers = response.activeUsers;
      });

    // reflect that a collaborator exited the room
    this.chatService.otherExitedRoom()
      .subscribe((response) => {
        console.log(response);
        this.notifyLeft(response.user.username);
        const index = this.activeUsers.findIndex(eachUser => eachUser.userId == response.user._id);
        this.activeUsers.splice(index, 1);
      })

    // reflect that a collaborator joined the room
    this.chatService.otherJoinedRoom()
      .subscribe((response) => {
        this.notifyJoin(response.user.username);
        this.activeUsers.push(response.user);
      });

    // display new chat messages from collaborators
    this.chatService.getChats()
      .subscribe((msg) => {
        if (this.chatMessages.length > 3) {
          this.chatMessages.shift();
        }
        this.chatMessages.push(msg.message);
      });

  }

  public closeSocket() {
    this.socketService.closeSocket();
  }

  public openSocket() {
    this.socketService.openSocket();
  }

  public submitMsg() {
    const newMsg = this.chatForm.get('newMsg').value;
    this.chatService.sendMsg(newMsg);
    if (this.chatMessages.length > 3) {
      this.chatMessages.shift();
    }
    this.chatMessages.push(newMsg);
    this.chatForm.get('newMsg').setValue('');
  }

  public joinRoom(room) {
    this.chatService.joinRoom(room);
  }

  public leaveRoom() {
    this.chatService.leaveRoom(this.activeRoom);
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
    // should this destroy the observables?
  }

}
