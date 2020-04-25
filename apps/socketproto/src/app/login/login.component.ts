import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sockets-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userArray;
  public displayError = false;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  private displayErrorMsg(msg) {
    this.errorMsg = msg;
    this.displayError = true;
    setTimeout(() => {
      this.displayError = false;
      this.errorMsg = '';
    }, 5000);
  }

  onSubmitLogin() {
    const credentials = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.dataService.login(credentials)
      .then(response => {
        console.log(response);
        this.dataService.saveToken(response.access_token);
        this.router.navigateByUrl('/chat');
      })
      .catch(err => {
        console.log(err);
        this.displayErrorMsg(err.error.message);
      });
  }

  ngOnInit(): void {
    this.dataService.getAllUsers()
      .then(response => {
        console.log(response);
        this.userArray = response;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
