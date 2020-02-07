import { NgModule } from '@angular/core';
import { PostagensPageRoutingModule } from './postagens-routing.module';
import { PostagensPage } from './postagens.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    PostagensPageRoutingModule
  ],
  declarations: [PostagensPage]
})
export class PostagensPageModule {}
