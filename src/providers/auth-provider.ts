import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public af: AngularFire) { }

  getAuth() {
    return this.af.auth;
  }

  login(credentials) {
    return this.af.auth.login(credentials);
  }

  createAccount(credentials) {
    return this.af.auth.createUser(credentials);
  }

  logout() {
    this.af.auth.logout();
  }

}
