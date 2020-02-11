import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostagemPageRoutingModule } from './add-postagem-routing.module';

import { AddPostagemPage } from './add-postagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPostagemPageRoutingModule
  ],
  declarations: [AddPostagemPage]
})
export class AddPostagemPageModule {}
