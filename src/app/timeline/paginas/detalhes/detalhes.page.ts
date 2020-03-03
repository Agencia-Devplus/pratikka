import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { PopoverController } from '@ionic/angular';
import { DetalhesPopoverPage } from '../detalhes-popover/detalhes-popover.page';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  user: firebase.User;
  idpostagem: string;
  id_user_postagem: any;
  postagem: any;


  constructor(private crudService: CrudService,
    public route: ActivatedRoute,
    private auth: AuthService,
    private popoverController: PopoverController
  ) {
    this.auth.authState$.subscribe(user => (this.user = user));
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idpostagem = params.get('id')
    })
  }

  ngOnInit() {
    this.getPostagem(this.idpostagem);
  }

  getPostagem(recordRow) {
    this.crudService.detail_Postagem(this.idpostagem).subscribe(data => {
      this.postagem = data.data();
      this.id_user_postagem = data.get('id');
      //convertendo objeto em array
      this.postagem = Array.of(this.postagem);          
    })
  }

  async abrirMenu(ev: Event) {
    const popover = await this.popoverController.create({
      component: DetalhesPopoverPage,
      componentProps: {
        id_postagem: this.idpostagem,
        id_user: this.user.uid,
        id_user_post: this.id_user_postagem
      },
      event: ev
    });
    popover.present();
  }
}
