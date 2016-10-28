import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserProvider } from './user-provider';

/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatsProvider {

  constructor(public af: AngularFire, public up: UserProvider) {}

  getChats() {
    return this.up.getUid().then(uid => {
      let chats = this.af.database.list(`/users/${uid}/chats`);
      return chats;
    });
  }

  addChats(uid, interlocutor) {
    
    let endpoint = this.af.database.object(`/users/${uid}/chats/${interlocutor}`);
    endpoint.set(true);

    let endpoint2 = this.af.database.object(`/users/${interlocutor}/chats/${uid}`);
    endpoint2.set(true);

  }

  getChatRef(uid, interlocutor) {

    let firstRef = this.af.database.object(`/chats/${uid},${interlocutor}`, {preserveSnapshot: true});
    let promise = new Promise((resolve, reject) => {

      firstRef.subscribe(snapshot => {
        let a = snapshot.exists();
        if (a) {
          resolve(`/chats/${uid},${interlocutor}`);
        } else {
          let secondRef = this.af.database.object(`/chats/${interlocutor},${uid}`, {preserveSnapshot: true});
          secondRef.subscribe(snapshot => {
            let b = snapshot.exists();
            if(!b) {
              this.addChats(uid, interlocutor);
            }
          });

          resolve(`/chats/${interlocutor},${uid}`);

        };

      });
      
    });

    return promise;

  }


}
