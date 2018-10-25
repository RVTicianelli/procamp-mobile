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

  campanhas: CampanhaDTO[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public campanhaService: CampanhaService) {
  }

  ionViewDidLoad() {
    this.campanhaService.findAll().subscribe(response => {

      for(let i = 0; i < response.length; i++){
        let dtIni = response[i].dataInicio.split('-');
        let dtIniForm = dtIni[2]+'/'+dtIni[1]+'/'+dtIni[0];
        let dtFim = response[i].dataFim.split('-');
        let dtFimForm = dtFim[2]+'/'+dtFim[1]+'/'+dtFim[0];

        response[i].dataInicio = dtIniForm;
        response[i].dataFim = dtFimForm;

        this.campanhas.push(response[i]);
      }
    },
    error => {});
  }

  showCampanha(campanhaId : String){
    this.navCtrl.push("CampanhaPage", {campanhaId: campanhaId});
  }

}
