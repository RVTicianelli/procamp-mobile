import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CampanhaService } from '../../services/domain/campanha.service';
import { CampanhaDTO } from '../../models/campanha';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { LocalUser } from '../../models/local_user';

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {

  campanhas: CampanhaDTO[] = [];
  preferenciasUsu: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public campanhaService: CampanhaService, public storage: StorageService,
              public usuarioService: UsuarioService, public alertCrtl: AlertController) {
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

    let localUser = this.storage.getLocalUser();
    if(localUser != null) {
      this.usuarioService.findByEmail(localUser.email).subscribe(response =>{
        for(let i = 0; i < (response.preferencias.length); i++) {
          this.preferenciasUsu.push(response.preferencias[i]["id"]);
        }
        let user : LocalUser = {
          token: localUser.token,
          email: localUser.email,
          pref: this.preferenciasUsu
      };
  
        this.storage.setLocalUser(user);
        console.log(this.preferenciasUsu);
      })
    }
  }

  showCampanha(campanhaId : String){
    this.navCtrl.push("CampanhaPage", {campanhaId: campanhaId});
  }

  changeFilter(filter) {
    if(filter == 'preferencias'){
      let localUser = this.storage.getLocalUser();
      if(localUser == null) {
        let alert = this.alertCrtl.create({
          title: 'Erro',
          message: 'Você deve estar logado para usar esta opção.',
          enableBackdropDismiss: false,
          buttons: [
            { text:'ok' }
          ]
        })
        alert.present();
        location.reload();
      }
      else{
        this.updateCampanhas(filter, localUser.pref);
      }
    }
    console.log('mudou: ' + filter);
    //let localUser = this.storage.getLocalUser();
    //console.log(localUser.email);
  }

  updateCampanhas(filter, prefs) {
    if(filter == 'preferencias') {
      this.campanhas = [];
      this.campanhaService.findByPref(prefs[0]).subscribe(response => {
        this.campanhas = response;        
      },
      error=>{});

    }
  }

}
