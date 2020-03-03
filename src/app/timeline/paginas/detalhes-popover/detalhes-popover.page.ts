import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController } from '@ionic/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-detalhes-popover',
  templateUrl: './detalhes-popover.page.html',
  styleUrls: ['./detalhes-popover.page.scss'],
})
export class DetalhesPopoverPage implements OnInit {
  postagem_id: any;
  id_user: any;
  id_user_post: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private crudService: CrudService,
    private overlay: OverlayService) {

  }

  ngOnInit() {
    this.postagem_id = this.navParams.get('id_postagem');
    this.id_user = this.navParams.get('id_user');
    this.id_user_post = this.navParams.get('id_user_post');
  }

  async removerPostagem() {
    await this.overlay.alert({
      message: 'Tem certeza?',
      buttons: [{
        text: 'Sim',
        handler: async () => {
          this.crudService.delete_Postagem(this.postagem_id);
          this.popoverController.dismiss();
          this.navCtrl.pop();
        }
      },
        'Não'
      ]
    })
  }

  fecharPopover() {
    this.popoverController.dismiss();
  }

}
