import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@sockets/api-interfaces';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'sockets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
    ) {}

}
