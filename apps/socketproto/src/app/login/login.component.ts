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

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

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
      });
  }

  ngOnInit(): void {
  }

}
