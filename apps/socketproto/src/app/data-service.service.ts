import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from './constants/api-base-url.constant';
import { Observable } from 'rxjs';
import { BROWSER_STORAGE } from './customsocket/customsocket.service';
import { CustomsocketService } from './customsocket/customsocket.service';

interface HttpOptions {
  headers: HttpHeaders;
}

interface Credentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBaseUrl = API_BASE_URL;

  private access_token = '';

  private httpOptions: HttpOptions;

  constructor(
    private http: HttpClient,
    private customSocket: CustomsocketService,
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) { }

  private refreshHttpOptions() {
    this.access_token = this.getToken();
    this.customSocket.resetToken(this.access_token);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.access_token}`
      })
    }
  }

  public getToken(): string {
    return this.storage.getItem('proto_access_token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('proto_access_token', token);
  }

  public async login(credentials: Credentials): Promise<any> {
    const url = `${this.apiBaseUrl}auth/login`;
    return this.http
      .post(url, credentials)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  public async getRooms() {
    this.refreshHttpOptions();
    const url = `${this.apiBaseUrl}rooms/all`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(err => {
        return Promise.reject(err);
      });
  }


}
