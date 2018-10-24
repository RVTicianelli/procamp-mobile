import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampanhaPage } from './campanha';

@NgModule({
  declarations: [
    CampanhaPage,
  ],
  imports: [
    IonicPageModule.forChild(CampanhaPage),
  ],
})
export class CampanhaPageModule {}
