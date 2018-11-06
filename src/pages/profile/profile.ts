import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCampanhaService } from '../../services/domain/tipoCampanha.service';
import { TipoCampanha } from '../../models/tipoCampanha';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userId;
  usuario: UsuarioDTO = {
    nome : "",
    dataNascimento: "",
    cpf: "",
    sexo: "",
    email: "",
    senha: "",
    tipoCampanha: [""],
    ultimoLogin:"",
    perfis:[2]
  }
  usuarionew : UsuarioDTO;
  tipoCampanhaAdd: any;
  novaSenha: String;
  tpCampanhas: TipoCampanha[];
  tpCampanhaListaId = [];
  tpCampanhaListaDesc = [];

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public storage: StorageService, public usuarioService: UsuarioService,
              public formBuilder: FormBuilder, public alertCrtl: AlertController,
              public tipoCampanhaService: TipoCampanhaService, public authService: AuthService) {
  }

  ionViewDidLoad() {
    this.tipoCampanhaService.findAll()
      .subscribe(response => {
        this.tpCampanhas = response;
        console.log(this.tpCampanhas);
      },
      error => {}
    );

    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        console.log(response);
        this.userId =response["id"];
        this.usuario = response;
        for(let i = 0; i < response["tipoCampanha"].length; i++) {
          this.tpCampanhaListaId.push(response["tipoCampanha"][i]["id"]);
          this.tpCampanhaListaDesc.push(response["tipoCampanha"][i]["descricao"]);
        }
      },
      error =>{
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }

  }

  salvarUsuario() {
    let senha;
    if(this.novaSenha == null) {
      senha = this.storage.getPwd();
    }
    else {
      senha = this.novaSenha;
    }
    this.usuarionew = {
      nome: this.usuario.nome,
      dataNascimento: this.usuario.dataNascimento,
      cpf: this.usuario.cpf,
      sexo: this.usuario.sexo,
      email: this.usuario.email,
      tipoCampanha: this.tpCampanhaListaId,
      senha: senha,
      ultimoLogin: this.usuario.ultimoLogin,
      perfis: [2]
    }
    console.log(this.usuarionew);
    this.usuarioService.updateUser(this.userId, this.usuarionew)
      .subscribe(response =>{
        this.mensagemAtualizaUsu();
        this.authService.logout();
        this.navCtrl.setRoot('HomePage');
      },
      error => {});
    //console.log(this.usuario.nome);
  }

  excluiUsuario(){ 
    console.log('exclui');
    console.log(this.userId);
    console.log(this.usuario);
    this.usuario.tipoCampanha = [];
    console.log(this.usuario);
    this.usuarioService.updateUser(this.userId, this.usuario)
      .subscribe(response =>{
        console.log('atu');
        this.usuarioService.removeUser(this.userId)
        .subscribe(response => {
          this.mensagemDeletaUsu();
        },
        error => {})
      },
      error => {});
    
  }

  mensagemDeletaUsu(){
    let alert = this.alertCrtl.create({
      title: 'Sucesso',
      message: 'Cadastro excluido com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok',
          handler: () => {
            this.storage.setLocalUser(null);
            this.storage.setPwd(null);
            this.navCtrl.setRoot('InitPage');
          }
        }
      ]
    });
    alert.present();
  }

  mensagemAtualizaUsu(){
    let alert = this.alertCrtl.create({
      title: 'Sucesso',
      message: 'Cadastro atualizado com sucesso. Para efetivar as mudanças feitas faça o login novamente.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok',
        }
      ]
    });
    alert.present();
  }

  async adicionarTpLocalidade(){
    if(this.tpCampanhaListaId.indexOf(this.tipoCampanhaAdd["id"]) == -1) {
      this.tpCampanhaListaId.push(this.tipoCampanhaAdd["id"]);
      this.tpCampanhaListaDesc.push(this.tipoCampanhaAdd["descricao"]);
    }
  }

  apagar(descCampanha){
    let index = this.tpCampanhaListaDesc.indexOf(descCampanha);

    if(index > -1) {
      this.tpCampanhaListaDesc.splice(index, 1);
      this.tpCampanhaListaId.splice(index,1);
    }
  }
}
