import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { PopoverController, NavController, LoadingController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { AngularFireStorage } from '@angular/fire/storage';

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
    private navCtrl: NavController,
    private overlay: OverlayService,
    private storage: AngularFireStorage
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
    postagem.editTitulo = postagem.titulo;
    postagem.editTexto = postagem.texto;
    //postagem.editCapa = postagem.Capa;
  }

  async salvarEdicao(postagem) {
    const loading = await this.overlay.loading();
    let record = {};
    record['titulo'] = postagem.editTitulo;
    record['texto'] = postagem.editTexto;
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

  async removerPostagem(fullPath) {
    await this.overlay.alert({
      message: 'Deseja realmente apagar essa postagem?',
      buttons: [{
        text: 'Sim',
        handler: async () => {
          this.crudService.delete_Postagem(this.idpostagem);
          this.storage.ref(fullPath).delete();
          this.navCtrl.pop();
        }
      },
        'Não'
      ]
    })
  }
}
