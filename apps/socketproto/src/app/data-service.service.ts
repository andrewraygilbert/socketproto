import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { API_BASE_URL } from './constants/api-base-url.constant';

const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

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

  public getToken(): string {
    return this.storage.getItem('writility_access_token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('writility_access_token', token);
  }

  public async login(credentials: Credentials): Promise<any> {
    const url = `${this.apiBaseUrl}auth/login`;
    return this.http
      .post(url, credentials)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch((err) => {
        console.log(err);
        Promise.reject(err);
      })
  }

  public async getRooms() {
    const url = `${this.apiBaseUrl}rooms/all`;
    return this.http
      .get(url, this.httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(err => {
        console.log(err);
        Promise.reject(err);
      });
  }


}
