import { NgModule } from '@angular/core';
import { VideoPage } from './video.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule
  ],
  declarations: [VideoPage],
  exports: [VideoPage],
  entryComponents: [VideoPage]
})
export class VideoPageModule { }
