import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import { AuthProvider } from '../../providers/auth-provider';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AccountPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-page',
  templateUrl: 'account-page.html'
})
export class AccountPage {

  user = {};

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider,
              public authProvider: AuthProvider,
              public storage: Storage) {

    userProvider.getUser()
      .then(userObservable => {
        userObservable.subscribe(user => {
          this.user = user
        });
    });
  }

  updatePicture() {
    this.userProvider.updatePicture();
  }

  logout() {
    this.storage.remove('userInfo');
    this.authProvider.logout();
  }

}
