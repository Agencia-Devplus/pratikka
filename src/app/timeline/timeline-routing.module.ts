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
      }

    ]
  }  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
