import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/user';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpRegisterService {
  private urlLogin = environment.apiUrl + '/Login';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.urlLogin + '/GetAllUsers');
  }

  getByUserName(userName: User) {
    return this.http.get<User[]>(this.urlLogin + '/GetByUserName/' + userName);
  }

  register(user: User) {
    return this.http.post(this.urlLogin + '/Register', user);
  }

  putPassword(user: User) {
    return this.http.put(this.urlLogin + '/' + 1, user);
  }

  putTipoPermissao(user: User) {
    return this.http.put(this.urlLogin + '/' + 2, user);
  }

  putUserName(user: User) {
    return this.http.put(this.urlLogin + '/' + 3, user);
  }

  putFullName(user: User) {
    return this.http.put(this.urlLogin + '/' + 4, user);
  }
}
