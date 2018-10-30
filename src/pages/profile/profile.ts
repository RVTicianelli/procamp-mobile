import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  usuario: UsuarioDTO = {
    nome : "aa",
    dataNascimento: "",
    cpf: "",
    sexo: "",
    email: "",
    preferencias: [""],
    senha: "",
    tipoCampanha: [""],
    ultimoLogin:"",
    perfis:[""]
  }

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public storage: StorageService, public usuarioService: UsuarioService,
              public formBuilder: FormBuilder) {

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
    //console.log(this.usuario.nome);
  }

}
