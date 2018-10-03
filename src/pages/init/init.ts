import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampanhaService } from '../../services/domain/campanha.service';

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public campanhaService: CampanhaService) {
  }

  ionViewDidLoad() {
    this.campanhaService.findAll().subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

}
