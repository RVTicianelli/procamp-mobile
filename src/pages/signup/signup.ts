import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreferenciasService } from '../../services/domain/preferencias.service';
import { PreferenciasDTO } from '../../models/preferencias.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { MyApp } from '../../app/app.component';
import { AuthService } from '../../services/auth.service';
import { TipoCampanha } from '../../models/tipoCampanha';
import { TipoCampanhaService } from '../../services/domain/tipoCampanha.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  usuario: UsuarioDTO;
  tpCampanhas: TipoCampanha[];
  tpCampanhasUsu: TipoCampanha[];
  tpCampanhaListaId = [];
  tpCampanhaListaDesc = [];
  tpCampanhasListadas = [];

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public formBuilder: FormBuilder, public preferenciasService: PreferenciasService, 
              public usuarioService: UsuarioService, public alertCrtl: AlertController, 
              public app: MyApp, public auth: AuthService, public tipoCampanhaService: TipoCampanhaService) {

    this.formGroup = this.formBuilder.group({
      nome: ['nometeste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      dtNascimento: ['25/05/1992',[Validators.required]],
      cpf:['408.456.123-60', [Validators.required]],
      sexo:['M', [Validators.required]],
      email:['email3', [Validators.required]],
      senha:['123', [Validators.required]],
      tpCamapnhaId:['']
    })

    
  }

  ionViewDidLoad() {
    this.tipoCampanhaService.findAll()
      .subscribe(response => {
        this.tpCampanhas = response;
        console.log(this.tpCampanhas);
      },
      error => {});
  }

  signupUser(){
    if(this.tpCampanhaListaId.length == 0){
      this.showErroTipoCampanha();
    }
    else {
      this.usuario = {
        'nome': this.formGroup.value.nome,
        'dataNascimento': this.formGroup.value.dtNascimento,
        'cpf': this.formGroup.value.cpf,
        'sexo': this.formGroup.value.sexo,
        'email': this.formGroup.value.email,
        'senha': this.formGroup.value.senha,
        'tipoCampanha': this.tpCampanhaListaId,
        'ultimoLogin':"0001-01-01",
        'perfis':[2]
      }
  
      console.log(this.usuario);
  
      this.usuarioService.insert(this.usuario)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
    }
  }

  showInsertOk() {
    let alert = this.alertCrtl.create({
      title: 'Sucesso',
      message: 'Cadastro realizado',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok',
          handler: () => {
            this.auth.authenticate(this.creds)
            .subscribe(response => {
              console.log(response.headers.get('Authorization'));
              this.auth.successfulLogin(response.headers.get('Authorization'));
              this.app.getMenuOptions();
              this.navCtrl.setRoot('InitPage');
            })
          }
        }
      ]
    });
    alert.present();
  }

  showErroTipoCampanha() {
    let alert = this.alertCrtl.create({
      title: 'Erro',
      message:'Você deve escolher um tipo de campanha para fazer o cadastro.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok'
        }
      ]
    });
    alert.present();
  }

  async adicionarTpLocalidade(){
    if(this.tpCampanhaListaId.indexOf(this.formGroup.value.tpCamapnhaId["id"]) == -1) {
      this.tpCampanhaListaId.push(this.formGroup.value.tpCamapnhaId["id"]);
      this.tpCampanhaListaDesc.push(this.formGroup.value.tpCamapnhaId["descricao"]);
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
