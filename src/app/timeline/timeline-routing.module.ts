import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './paginas/pagina-principal/pagina-principal.module#PaginaPrincipalPageModule'

      },
      {
        path: 'add-postagem',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timeline/paginas/add-postagem/add-postagem.module').then(m => m.AddPostagemPageModule)
          }
        ]
      },
      {
        path: 'detalhes-popover',
        children: [
          {
            path: '',
            loadChildren: () => import('./paginas/detalhes-popover/detalhes-popover.module').then(m => m.DetalhesPopoverPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'texto',
    loadChildren: () => import('./paginas/texto/texto.module').then(m => m.TextoPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./paginas/video/video.module').then(m => m.VideoPageModule)
  },
  {
    path: 'podcast',
    loadChildren: () => import('./paginas/podcast/podcast.module').then(m => m.PodcastPageModule)
  },
  {
    path: 'detalhes/:id',
    loadChildren: () => import('./paginas/detalhes/detalhes.module').then(m => m.DetalhesPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
