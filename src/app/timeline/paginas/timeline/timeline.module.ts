import { NgModule } from '@angular/core';
import { TimelinePageRoutingModule } from './timeline-routing.module';

import { TimelinePage } from './timeline.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CompartilhadoModule,
    TimelinePageRoutingModule
  ],
  declarations: [TimelinePage]
})
export class TimelinePageModule {}
