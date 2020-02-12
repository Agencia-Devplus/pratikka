import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  user: firebase.User;
  constructor(
    private auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }

  backButtonSubscription;

  initializeApp() {
    this.platform.ready().then(() => {
      this.angularFireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.navCtrl.navigateRoot('/inicio/painel/timeline');
          this.splashScreen.hide();
        } else {
          this.navCtrl.navigateRoot('/login');
          this.splashScreen.hide();
        }
      });
      this.statusBar.styleDefault();
    });
  }

  ngOnInit() {
    if (this.platform.is('android')) {
      this.platform.backButton.subscribeWithPriority(0, () => {
        console.log('this.router.url', this.router.url);
        if (this.router.url === '/inicio/painel/timeline' ||
          this.router.url === '/inicio/painel/postagens' ||
          this.router.url === '/inicio/painel/perfil') {
          navigator['app'].exitApp();
        } else {
          this.navCtrl.pop();
        }
      });
    }
  }
}
