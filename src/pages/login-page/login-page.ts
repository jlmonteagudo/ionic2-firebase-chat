import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth-provider';
import { UtilProvider } from '../../providers/util-provider';
import { UserProvider } from '../../providers/user-provider';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

  loginForm: any;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              fb: FormBuilder,
              public authProvider: AuthProvider,
              public utilProvider: UtilProvider,
              public userProvider: UserProvider) {

      this.loginForm = fb.group({
        email: ["", Validators.compose([Validators.required])],
        password: ["", Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  login() {
    this.authProvider.login(this.loginForm.value)
      .then(
        (data) => {
        this.storage.set('userInfo', JSON.stringify(data));
      },
      (errorMessage) => {
        let alert = this.utilProvider.doAlert("Error", errorMessage, "Ok");
        alert.present();
      });
  }

  createAccount() {
    let credentials = this.loginForm.value;
    this.authProvider.createAccount(credentials)
      .then((data) => {
        this.storage.set('userInfo', JSON.stringify(data)).
          then(() => this.userProvider.createUser(credentials));
      },
      (errorMessage) => {
        let alert = this.utilProvider.doAlert("Error", errorMessage, "Ok");
        alert.present();
      });
  }


}
