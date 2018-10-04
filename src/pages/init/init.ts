import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampanhaService } from '../../services/domain/campanha.service';
import { CampanhaDTO } from '../../models/campanha';

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {

  campanhas: CampanhaDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public campanhaService: CampanhaService) {
  }

  ionViewDidLoad() {
    this.campanhaService.findAll().subscribe(response => {
      this.campanhas = response;
    },
    error => {});
  }

}
