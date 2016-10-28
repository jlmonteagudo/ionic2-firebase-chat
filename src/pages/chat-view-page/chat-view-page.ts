import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats-provider';
import { UserProvider } from '../../providers/user-provider';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the ChatViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat-view-page',
  templateUrl: 'chat-view-page.html'
})
export class ChatViewPage {

  uid: string;
  interlocutor: string;
  chats: FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;
  message: string;


  constructor(public navCtrl: NavController,
              public params: NavParams,
              public chatsProvider: ChatsProvider,
              public userProvider: UserProvider,
              public af: AngularFire) {

    this.uid = params.data.uid;
    this.interlocutor = params.data.interlocutor;
    
    chatsProvider.getChatRef(this.uid, this.interlocutor)
      .then( (chatRef: any) => {
        this.chats = af.database.list(chatRef);
      })

  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  sendMessage() {

    if (this.message) {

      let chat = {
        from: this.uid,
        message: this.message,
        type: 'message'
      };

      this.chats.push(chat);
      this.message = '';

    }

  }

  sendPicture() {

    let chat = {
      from: this.uid,
      picture: null,
      type: 'picture'
    };

    this.userProvider.getPicture()
      .then((image) => {
        chat.picture = image;
        this.chats.push(chat);
      });

  }


}
