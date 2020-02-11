import { NgModule } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
<<<<<<< HEAD
<<<<<<< HEAD
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
=======
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
=======
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';



@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
<<<<<<< HEAD
<<<<<<< HEAD
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
=======
=======
>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
    AngularFirestoreModule.enablePersistence({
      synchronizeTabs: true
    })

<<<<<<< HEAD
>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
=======
>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
  ],
  exports: [
    BrowserModule,
    IonicModule
  ],
  providers: [
<<<<<<< HEAD
=======
    Camera,
>>>>>>> c64579bd36d55a0102b1736c5f5d1d7ede4c444b
    Crop,
    File,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }    
  ],
})
export class CoreModule { }