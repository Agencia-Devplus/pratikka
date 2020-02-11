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

      }

    ]
  },
  {
    path: 'timeline',
    loadChildren: () => import('./paginas/timeline/timeline.module').then( m => m.TimelinePageModule)
  },  {
    path: 'add-postagem',
    loadChildren: () => import('./paginas/add-postagem/add-postagem.module').then( m => m.AddPostagemPageModule)
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
