import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { OverlayService } from 'src/app/core/services/overlay.service';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PerfilService } from '../../services/perfil.service';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: firebase.User;
  downloadURL: Observable<string>;
  urlCroppedIMG: string;
  urlIMG: string;

  constructor(
    private auth: AuthService,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private storage: AngularFireStorage,
    private overlay: OverlayService,
    private crop: Crop
  ) {
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {
  }

  // Testes upload de imagens
  async abrirGaleria() {
    const opcoes: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    const loading = await this.overlay.loading();
    try {

      /*const fileURI: string =*/ await this.camera.getPicture(opcoes).then((imageData) => {
      this.cropImage(imageData);
    })

      /*
      let file: string;

      if (this.platform.is('ios')) {
        file = fileURI.split('/').pop();
      } else {
        file = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.indexOf('?'));
        this.crop.crop(file, { quality: 70 }).then((caminho) => {
          this.urlCroppedIMG = caminho;
        })
      }

      const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

      this.uploadPic(blob);
      */


    } catch (e) {
      this.overlay.toast({
        message: 'Erro: ' + e
      })
    } finally {
      loading.dismiss();
    }
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        async newPath => {
          let file: string;

          if (this.platform.is('ios')) {
            file = newPath.split('/').pop();
          } else {
            file = newPath.substring(newPath.lastIndexOf('/') + 1, newPath.indexOf('?'));
            this.crop.crop(file, { quality: 70 }).then((caminho) => {
              this.urlCroppedIMG = caminho;
            })
          }

          const path: string = newPath.substring(0, newPath.lastIndexOf('/'));
          const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
          const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

          this.uploadPic(blob);
        },
        error => {
          this.overlay.toast({
            message: 'Erro cortando a img: ' + error
          })
        }
      );
  }

  uploadPic(blob: Blob) {
    const ref = this.storage.ref(this.user.uid + '/profile/avatar.jpg');
    const task = ref.put(blob);

    task.snapshotChanges()
      .pipe(finalize(() => ref.getDownloadURL().subscribe(data => {
        this.urlIMG = data;
        this.user.updateProfile({
          photoURL: this.urlIMG
        })
      })))
      .subscribe();
  }
}