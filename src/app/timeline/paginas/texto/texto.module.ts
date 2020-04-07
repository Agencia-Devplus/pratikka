import { NgModule } from '@angular/core';
import { TextoPageRoutingModule } from './texto-routing.module';
import { TextoPage } from './texto.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
  ],
  declarations: [TextoPage],
  exports: [TextoPage],
  entryComponents: [TextoPage]
})
export class TextoPageModule { }
