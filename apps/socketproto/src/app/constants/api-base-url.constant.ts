import { environment } from './../../environments/environment';

export const API_BASE_URL = environment.production ? 'http://socketproto.herokuapp.com/api/' : 'http://localhost:3333/api/';

export const BASE_URL = environment.production ? 'http://socketproto.herokuapp.com' : 'http://localhost:3333';
