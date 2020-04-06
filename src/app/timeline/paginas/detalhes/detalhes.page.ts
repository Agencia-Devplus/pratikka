import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { PopoverController, NavController, LoadingController } from '@ionic/angular';
import { DetalhesPopoverPage } from '../detalhes-popover/detalhes-popover.page';
import { OverlayService } from 'src/app/core/services/overlay.service';

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
    private popoverController: PopoverController,
    private navCtrl: NavController,
    private overlay: OverlayService
  ) {
    this.auth.authState$.subscribe(user => (this.user = user));
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idpostagem = params.get('id')
    })
  }

  async ngOnInit() {
    const loading = await this.overlay.loading();
    try {
      this.getPostagem();
    } catch (e) {
      this.overlay.toast({
        message: "Erro ao buscar os dados: " + e.message
      })
    } finally {
      loading.dismiss();
    }

  }

  getPostagem() {
    this.crudService.detail_Postagem(this.idpostagem).subscribe(data => {
      this.postagem = data.data();
      this.id_user_postagem = data.get('id');
      //convertendo objeto em array
      this.postagem = Array.of(this.postagem);
    })
  }

  editarPostagem(postagem) {
    postagem.isEdit = true;
    postagem.editTitulo = postagem.Titulo;
    postagem.editTexto = postagem.Texto;
    //postagem.editCapa = postagem.Capa;
  }

  async salvarEdicao(postagem) {
    const loading = await this.overlay.loading();
    let record = {};
    record['Titulo'] = postagem.editTitulo;
    record['Texto'] = postagem.editTexto;
    //record['Capa'] = postagem.editCapa;
    try {
      this.crudService.update_Postagem(this.idpostagem, record);
      this.ngOnInit();
    } catch (e) {
      this.overlay.toast({
        message: "Erro: " + e.message
      })
    } finally {
      loading.dismiss();
    }

    postagem.isEdit = false;
  }

  async removerPostagem() {
    await this.overlay.alert({
      message: 'Deseja realmente apagar essa postagem?',
      buttons: [{
        text: 'Sim',
        handler: async () => {
          this.crudService.delete_Postagem(this.idpostagem);
          this.navCtrl.pop();
        }
      },
        'Não'
      ]
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
