import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import { FirebaseListObservable } from 'angularfire2';
import { ChatViewPage } from '../chat-view-page/chat-view-page';

/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users-page',
  templateUrl: 'users-page.html'
})
export class UsersPage {

  users: FirebaseListObservable<any[]>;
  uid: string;

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {

    userProvider.getUid()
      .then(uid => {
        this.uid = uid;
        this.users = userProvider.getAllUsers();
      });

  }

  ionViewDidLoad() {
    console.log('Hello UsersPage Page');
  }

  openChat(interlocutor: string) {
    let params = { uid: this.uid, interlocutor: interlocutor };
    this.navCtrl.push(ChatViewPage, params)
  }

}
