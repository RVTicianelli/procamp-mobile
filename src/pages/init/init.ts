import { Component, ModuleWithComponentFactories } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CampanhaService } from '../../services/domain/campanha.service';
import { CampanhaDTO } from '../../models/campanha';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { LocalUser } from '../../models/local_user';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {

  campanhas: CampanhaDTO[] = [];
  campanhasNovas: CampanhaDTO[] = [];
  tipoCampanhasUsu: string[] = [];
  dataAtual: string = new Date().toISOString().substring(0, 10);

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public campanhaService: CampanhaService, public storage: StorageService,
              public usuarioService: UsuarioService, public alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    this.campanhaService.findAll().subscribe(response => {

      for(let i = 0; i < response.length; i++){
        response[i].dataInicio = this.formatData(response[i].dataInicio); 
        response[i].dataFim = this.formatData(response[i].dataFim); 

        this.campanhas.push(response[i]);
      }
    },
    error => {});

    let localUser = this.storage.getLocalUser();
    let idUser;
    if(localUser != null) {
      this.usuarioService.findByEmail(localUser.email).subscribe(response =>{
        idUser= response["id"];
        for(let i = 0; i < (response.tipoCampanha.length); i++) {
          this.tipoCampanhasUsu.push(response.tipoCampanha[i]["id"]);
        }

        let user : LocalUser = {
          token: localUser.token,
          email: localUser.email,
          tpCamps: this.tipoCampanhasUsu,
          ultimoLogin: response.ultimoLogin,
          perfis: [2]
        };
  
        this.storage.setLocalUser(user);

        let usuarioUpdate: UsuarioDTO = {
            nome: response.nome,
            dataNascimento: response.dataNascimento,
            cpf: response.cpf,
            sexo: response.sexo,
            email: response.email,
            tipoCampanha: this.tipoCampanhasUsu,
            senha: this.storage.getPwd(),
            ultimoLogin: this.dataAtual,
            perfis: [2]
        }

        this.usuarioService.updateUser(idUser, usuarioUpdate).subscribe(response => {

        });

        for(let i = 0; i < this.tipoCampanhasUsu.length; i ++) {
          this.campanhaService.findByTypeAndDate(this.tipoCampanhasUsu[i], user.ultimoLogin).subscribe(response => {
            for(let x = 0; x < response.length; x++) {
              this.campanhasNovas.push(response[x]);
            }
          },
          error=>{});
        }
      })
    }
  }

  showCampanha(campanhaId : String){
    this.navCtrl.push("CampanhaPage", {campanhaId: campanhaId});
  }

  changeFilter(filter) {
    if(filter == 'novas'){
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
        this.updateCampanhas(filter, localUser.tpCamps);
      }
    }
    else {
      let localUser;
      this.updateCampanhas(filter, localUser);
    }

  }

  updateCampanhas(filter, tpCamps) {
    let localUser = this.storage.getLocalUser();
    if(filter == 'novas') {
      this.campanhas = [];
      this.campanhaService.findByTypeAndDate(tpCamps[0], localUser.ultimoLogin).subscribe(response => {
        this.campanhas = response;        
      },
      error=>{});
    }
    if(filter == 'recentes') {
      this.campanhas = [];
      this.campanhaService.findAll().subscribe(response => {

        for(let i = 0; i < response.length; i++){  
          response[i].dataInicio = this.formatData(response[i].dataInicio); 
          response[i].dataFim = this.formatData(response[i].dataFim); 
          this.campanhas.push(response[i]);
        }
      },
      error => {});
    }
  }

  formatData(data){
    let dataEnt = data.split('-');
    return dataEnt[2]+'/'+dataEnt[1]+'/'+dataEnt[0];
  }

}
