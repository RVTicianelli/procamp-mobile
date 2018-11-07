import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authService: AuthService) {
    this.initializeApp();
    this.getMenuOptions();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title:string, component: string}) {
    switch (page.title) {
      case 'Sair' :
        this.authService.logout();
        this.nav.setRoot('HomePage');
        break;
      
      default:
      this.nav.setRoot(page.component);
    }
  }

  getMenuOptions(){
    if (localStorage.getItem(STORAGE_KEYS.localUser) == null){
      this.pages = [
        { title: 'Inicio', component: 'InitPage' },
        { title: 'Cadastrar', component: 'SignupPage' },
        { title: 'Sair', component: '' },
      ];
    }
    else {
      this.pages = [
        { title: 'Inicio', component: 'InitPage' },
        { title: 'Meu Perfil', component: 'ProfilePage' },
        { title: 'Sair', component: '' },
      ];   
    }
  }
}
