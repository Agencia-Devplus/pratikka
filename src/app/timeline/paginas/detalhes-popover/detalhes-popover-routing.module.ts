import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesPopoverPage } from './detalhes-popover.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesPopoverPageRoutingModule {}
