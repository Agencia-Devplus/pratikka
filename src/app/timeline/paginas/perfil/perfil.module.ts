import { NgModule } from '@angular/core';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
