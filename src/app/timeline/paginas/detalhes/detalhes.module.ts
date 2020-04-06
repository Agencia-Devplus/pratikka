import { NgModule } from '@angular/core';
import { DetalhesPageRoutingModule } from './detalhes-routing.module';
import { DetalhesPage } from './detalhes.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    CompartilhadoModule,
    DetalhesPageRoutingModule
  ],
  declarations: [DetalhesPage]
})
export class DetalhesPageModule { }
