import { NgModule } from '@angular/core';
import { PodcastPageRoutingModule } from './podcast-routing.module';
import { PodcastPage } from './podcast.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule
  ],
  declarations: [PodcastPage],
  exports: [PodcastPage],
  entryComponents: [PodcastPage]
})
export class PodcastPageModule { }
