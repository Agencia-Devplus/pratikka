import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostagemPageRoutingModule } from './add-postagem-routing.module';

import { AddPostagemPage } from './add-postagem.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddPostagemPageRoutingModule
  ],
  declarations: [AddPostagemPage]
})
export class AddPostagemPageModule {}
