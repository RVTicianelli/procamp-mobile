import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CampanhaDTO } from '../../models/campanha';
import { CampanhaService } from '../../services/domain/campanha.service';
import { MapaReq } from '../../models/mapaReq';
import { MapaService } from '../../services/domain/mapa.service';

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
  enderecosCampanha: String[] = [];
  listaEnderecos: MapaReq;
  listaRetorno: MapaReq;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public campanhaService: CampanhaService, public mapaService: MapaService,
              public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    let campanhaId = this.navParams.get("campanhaId");
    this.campanhaService.findById(campanhaId).subscribe(response => {
      this.localidades = response.localidades;
      this.preferencias = response.preferencias;

      let dtIni = response.dataInicio.split('-');
      let dtIniForm = dtIni[2]+'/'+dtIni[1]+'/'+dtIni[0];
      let dtFim = response.dataFim.split('-');
      let dtFimForm = dtFim[2]+'/'+dtFim[1]+'/'+dtFim[0];

      response.dataInicio = dtIniForm;
      response.dataFim = dtFimForm;

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

  geraMapa(){
    if( this.campanha.localidades.length == 0){
      this.alertCampanhaSemLocalidade();
    }
    else {
      for( let i = 0; i < this.campanha.localidades.length; i++){
        let numero = this.campanha.localidades[i]['numero']
        let endereco = this.campanha.localidades[i]['cep']['nomeRua'];
        let uf = this.campanha.localidades[i]['cep']['cidade']['estado']['uf'];
        let replaced = endereco.split(' ').join('+');
  
        this.enderecosCampanha.push(numero+'+'+replaced+'+'+uf);
      }
      this.listaEnderecos = {
        "listaEnderecos": this.enderecosCampanha
      }
    
      this.mapaService.geraMapa(this.listaEnderecos)
        .subscribe(response => {
          this.navCtrl.push("MapPage", {list: response});
        })
    }
  }

  alertCampanhaSemLocalidade(){
    let alert = this.alertCrtl.create({
      title: 'Erro ao abrir o mapa.',
      message: 'A campanha não está vinculada a nenhuma localidade',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok',
        }
      ]
    });
    alert.present();
  }

}