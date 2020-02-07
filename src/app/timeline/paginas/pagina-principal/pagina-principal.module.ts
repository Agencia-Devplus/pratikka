import { NgModule } from '@angular/core';
import { PaginaPrincipalPageRoutingModule } from './pagina-principal-routing.module';
import { PaginaPrincipalPage } from './pagina-principal.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  imports: [
    CompartilhadoModule,
    PaginaPrincipalPageRoutingModule
  ],
  declarations: [PaginaPrincipalPage]
})
export class PaginaPrincipalPageModule {}
