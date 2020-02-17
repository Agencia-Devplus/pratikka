import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPostagemPage } from './add-postagem.page';

const routes: Routes = [
  {
    path: '',
    component: AddPostagemPage,
    children: [
      {
        path: 'texto',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../texto/texto.module').then(m => m.TextoPageModule)
          }
        ]
      },
      {
        path: 'video',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../video/video.module').then(m => m.VideoPageModule)
          }
        ]
      },
      {
        path: 'podcast',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../podcast/podcast.module').then(m => m.PodcastPageModule)
          }
        ]
      },
      /* {
        path: '',
        redirectTo: '/inicio/painel/timeline',
        pathMatch: 'full'
      } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPostagemPageRoutingModule {}
