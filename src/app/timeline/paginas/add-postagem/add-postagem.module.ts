import { NgModule } from '@angular/core';
import { AddPostagemPage } from './add-postagem.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { RouterModule } from '@angular/router';
import { TextoPageModule } from '../texto/texto.module';
import { PodcastPageModule } from '../podcast/podcast.module';
import { VideoPageModule } from '../video/video.module';

@NgModule({
  imports: [
    TextoPageModule,
    PodcastPageModule,
    VideoPageModule,
    SuperTabsModule,
    CompartilhadoModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddPostagemPage,
      },
    ])

  ],
  declarations: [AddPostagemPage]
})
export class AddPostagemPageModule { }
