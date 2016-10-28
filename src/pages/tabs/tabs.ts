import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UsersPage } from '../users-page/users-page';
import { ChatsPage } from '../chats-page/chats-page';
import { AccountPage } from '../account-page/account-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tabUsers: any = UsersPage;
  tabChats: any = ChatsPage;
  tabAccount: any = AccountPage;

  constructor() {

  }
}
