import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFire } from 'angularfire2';
import { Camera } from 'ionic-native';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  constructor(public af: AngularFire, public storage: Storage) {}

  getUid() {
    return this.storage.get('userInfo')
    .then(value => {
      let newValue = JSON.parse(value);
      return newValue.uid;
    });
  }

  createUser(userCredentials) {
    this.getUid().then(uid => {
      let currentUserRef = this.af.database.object(`/users/${uid}`);
      currentUserRef.set({email: userCredentials.email});
    });
  }

  getUser() {
    return this.getUid().then(id => {
      return this.af.database.object(`/users/${id}`);
    });
  }

  getAllUsers() {
    return this.af.database.list('/users');
  }

  getPicture() {
    let base64Pciture;
    let options = {
      destinationType: 0,
      sourceType: 0,
      encodingType: 0
    };

    let promise = new Promise((resolve, reject) => {
      Camera.getPicture(options).then((imageData) => {
        base64Pciture = "data:image/jpeg;base64," + imageData;
        resolve(base64Pciture);
      }, (error) => {
        reject(error);
      });
    });

    return promise;
  }

  updatePicture() {
    this.getUid().then(uid => {
      let pictureRef = this.af.database.object(`/users/${uid}/picture`);
      this.getPicture().then(image => pictureRef.set(image));
    });
  }

}
