import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule }   from '@angular/forms';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login-page/login-page';
import { UsersPage } from '../pages/users-page/users-page';
import { ChatViewPage } from '../pages/chat-view-page/chat-view-page';
import { ChatsPage } from '../pages/chats-page/chats-page';
import { AccountPage } from '../pages/account-page/account-page';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth-provider';
import { ChatsProvider } from '../providers/chats-provider';
import { UserProvider } from '../providers/user-provider';
import { UtilProvider } from '../providers/util-provider';


export const firebaseConfig = {
  apiKey: "YOUR apiKey",
  authDomain: "YOUR authDomain",
  databaseURL: "YOUR databaseURL",
  storageBucket: "YOUR storageBucket",
  messagingSenderId: "YOUR messagingSenderId"
};
 
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatViewPage,
    ChatsPage,
    AccountPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    UsersPage,
    ChatViewPage,
    ChatsPage,
    AccountPage
  ],
  providers: [ 
    Storage,
    AuthProvider,
    ChatsProvider,
    UserProvider,
    UtilProvider 
  ]
})
export class AppModule {}
