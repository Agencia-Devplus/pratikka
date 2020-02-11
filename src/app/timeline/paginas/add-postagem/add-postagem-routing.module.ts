import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPostagemPage } from './add-postagem.page';

const routes: Routes = [
  {
    path: '',
    component: AddPostagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPostagemPageRoutingModule {}
