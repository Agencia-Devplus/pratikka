import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-botao-logout',
  template: `
    <ion-buttons>
      <ion-button (click)="logout()">
        <ion-icon name="exit" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-buttons>
  `
})
export class BotaoLogoutComponent implements OnInit {

  constructor(private auth: AuthService,
    private nav: NavController,
    private overlay: OverlayService,
    private menuCtrl: MenuController) { }

  ngOnInit() { }

  async logout(): Promise<void> {
    await this.overlay.alert({
      message: 'Deseja realmente sair da sua conta?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.auth.logout();
            //await this.menuCtrl.enable(false, this.menu);
            this.nav.navigateRoot('/login');
          }
        },
        'Não'
      ]
    });
  }

}
