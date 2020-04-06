import { NgModule } from '@angular/core';
import { DetalhesPopoverPageRoutingModule } from './detalhes-popover-routing.module';
import { DetalhesPopoverPage } from './detalhes-popover.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    DetalhesPopoverPageRoutingModule
  ],
  declarations: [DetalhesPopoverPage]
})
export class DetalhesPopoverPageModule {}
