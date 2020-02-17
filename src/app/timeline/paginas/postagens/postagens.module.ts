import { NgModule } from '@angular/core';
import { PostagensPageRoutingModule } from './postagens-routing.module';
import { PostagensPage } from './postagens.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CompartilhadoModule,
    PostagensPageRoutingModule
  ],
  declarations: [PostagensPage]
})
export class PostagensPageModule {}
