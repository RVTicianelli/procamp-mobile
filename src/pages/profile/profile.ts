import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userId;
  usuario: UsuarioDTO = {
    nome : "aa",
    dataNascimento: "",
    cpf: "",
    sexo: "",
    email: "",
    senha: "",
    tipoCampanha: [""],
    ultimoLogin:"",
    perfis:[2]
  }

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public storage: StorageService, public usuarioService: UsuarioService,
              public formBuilder: FormBuilder, public alertCrtl: AlertController) {

    /*this.formGroup = this.formBuilder.group({
      nome:[''],
      email:[''],
      sexo:[''],
      dtNascimento:[''],
      cpf:[''],
      senha:[''],
      preferenciaId:['']
    })  */  

  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
      .subscribe(response => {
        console.log(response);
        this.userId =response["id"];
        this.usuario = response;
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
    console.log('ionViewDidLoad ProfilePage');
  }

  populateFields(){ 
    

    /*this.formGroup = this.formBuilder.group({
      nome:[this.usuario.nome, [Validators.required]],
      email:[this.usuario.email, [Validators.required]],
      sexo:['M', [Validators.required]],
      dtNascimento:[this.usuario.dataNascimento, [Validators.required]],
      cpf:[this.usuario.cpf, [Validators.required]],
      senha:['', [Validators.required]],
      preferenciaId:[]
      
     
    })*/

    
  }

  mostra() {
    console.log(this.storage.getPwd());
    //console.log(this.usuario.nome);
  }

  excluiUsuario(){ 
    console.log('exclui');
    console.log(this.userId);
    this.usuarioService.removeUser(this.userId)
      .subscribe(response => {
        this.mensagemDeletaUsu();
      },
      error => {})
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

}
