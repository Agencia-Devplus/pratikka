import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: firebase.User;
  constructor(
    private auth: AuthService,
    private angularFireAuth: AngularFireAuth,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.angularFireAuth.auth.onAuthStateChanged(user =>{
        if(user){
          this.navCtrl.navigateForward('/inicio/painel/postagens');
          this.splashScreen.hide();
        } else {
          this.navCtrl.navigateForward('/login');
          this.splashScreen.hide();
        }
      });
      this.statusBar.styleDefault();
      
    });
  }
}
