import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats-provider';
import { UserProvider } from '../../providers/user-provider';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ChatViewPage } from '../chat-view-page/chat-view-page';

/*
  Generated class for the ChatsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chats-page',
  templateUrl: 'chats-page.html'
})
export class ChatsPage {

  chats: Observable<any[]>;

  constructor(public navCtrl: NavController, 
              public chatsProvider: ChatsProvider,
              public userProvider: UserProvider,
              public af:AngularFire) {

    chatsProvider.getChats()
      .then(chats => {
        this.chats = chats.map(users => {
          return users.map(user => {
            user.info = af.database.object(`/users/${user.$key}`);
            return user; 
          });
        });
      });

  }

  openChat(key) {
    this.userProvider.getUid()
      .then(uid => {
        let param = { uid: uid, interlocutor: key };
        this.navCtrl.push(ChatViewPage, param);
      });
  }


}
