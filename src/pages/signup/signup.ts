import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreferenciasService } from '../../services/domain/preferencias.service';
import { PreferenciasDTO } from '../../models/preferencias.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  preferencias: PreferenciasDTO[];
  preferenciasListadas: PreferenciasDTO[];
  usuario: UsuarioDTO;
  preferenciasListaId = [];
  preferenciasListaDesc = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public preferenciasService: PreferenciasService, public usuarioService: UsuarioService, public alertCrtl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['nometeste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      dtNascimento: ['25/05/1992',[Validators.required]],
      cpf:['408.456.123-60', [Validators.required]],
      sexo:['M', [Validators.required]],
      email:['email3', [Validators.required]],
      senha:['123', [Validators.required]],
      preferenciaId:[''],
      preferencias: ['']
    })

    
  }

  ionViewDidLoad() {
    this.preferenciasService.findAll()
    .subscribe(response => {
      this.preferencias=response;
      //this.preferenciaId
      this.formGroup.controls.preferenciaId.setValue(this.preferencias[0].id);
    },
    error => {});
  }

  signupUser(){
    this.usuario = {
      'nome': this.formGroup.value.nome,
      'dataNascimento': this.formGroup.value.dtNascimento,
      'cpf': this.formGroup.value.cpf,
      'sexo': this.formGroup.value.sexo,
      'email': this.formGroup.value.email,
      'preferencias': this.formGroup.value.preferencias,
      'senha': this.formGroup.value.senha
    }

    console.log(this.usuario);

    this.usuarioService.insert(this.usuario)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {});
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
            this.navCtrl.setRoot('InitPage');
          }
        }
      ]
    });
    alert.present();
  }

  adicionarPreferencia(){
    if (this.formGroup.value.preferenciaId in this.preferenciasListaId) {
      console.log('ja tem');
    }
    else {
      this.preferenciasListaId.push(this.formGroup.value.preferenciaId);
      this.preferenciasListaDesc.push(this.preferencias[this.formGroup.value.preferenciaId-1].nome);
      this.formGroup.value.preferencias =  this.preferenciasListaId;
    }
  }
}
