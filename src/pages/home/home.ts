import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  entrarSemCadastro() {
    console.log(this.creds);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('InitPage');
      })
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }

}
