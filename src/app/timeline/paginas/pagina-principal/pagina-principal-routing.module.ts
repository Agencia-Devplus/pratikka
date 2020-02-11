import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaPrincipalPage } from './pagina-principal.page';

const routes: Routes = [
  {
    path: 'painel',
    component: PaginaPrincipalPage,
    children: [
      {
        path: 'postagens',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../postagens/postagens.module').then(m => m.PostagensPageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },
      {
        path: 'timeline',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timeline/timeline.module').then(m => m.TimelinePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/painel/postagens',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/painel/postagens',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaPrincipalPageRoutingModule { }
