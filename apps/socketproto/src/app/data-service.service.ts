import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE_URL } from './constants/api-base-url.constant';
import { BROWSER_STORAGE } from './constants/browser-storage.constant';
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
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.access_token}`
      })
    }
  }

  public getActiveUsername() {
    const user = this.getUserInfo();
    return user.username;
  }

  public getUserInfo() {
    const token = this.getToken();
    const userInfo = JSON.parse(atob(token.split('.')[1]));
    return userInfo;
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
      .then(response => {
        return response;
      })
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

  public async getAllUsers() {
    const url = `${this.apiBaseUrl}users`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(err => {
        return Promise.reject(err);
      });
  }


}
