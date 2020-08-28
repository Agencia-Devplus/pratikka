import { NgModule } from '@angular/core';
import { VideoPage } from './video.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { File } from '@ionic-native/File/ngx';

@NgModule({
  imports: [
    CompartilhadoModule
  ],
  declarations: [VideoPage],
  exports: [VideoPage],
  providers: [File],
  entryComponents: [VideoPage]
})
export class VideoPageModule { }
