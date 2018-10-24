import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampanhaDTO } from '../../models/campanha';
import { CampanhaService } from '../../services/domain/campanha.service';

@IonicPage()
@Component({
  selector: 'page-campanha',
  templateUrl: 'campanha.html',
})
export class CampanhaPage {

  campanha: CampanhaDTO;
  localidades: String[];
  preferencias: String[];
  resp = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public campanhaService: CampanhaService) {
  }

  ionViewDidLoad() {
    let campanhaId = this.navParams.get("campanhaId");
    this.campanhaService.findById(campanhaId).subscribe(response => {
      this.localidades = response.localidades;
      this.preferencias = response.preferencias;

      if(this.localidades.length == 0) {
        this.resp =[{
          nome:"--"
        }];
        this.localidades = this.resp;
      }

      if(this.preferencias.length == 0) {
        this.resp =[{
          nome:"--"
        }];
        this.preferencias = this.resp;
      }
      
      this.campanha = response;
    },
  error => {});
  }

}
