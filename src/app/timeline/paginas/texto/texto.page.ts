import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Crop } from '@ionic-native/crop/ngx';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.page.html',
  styleUrls: ['./texto.page.scss'],
})
export class TextoPage implements OnInit {

  user: firebase.User;

  postagens: any;
  postagemTitulo: string;
  postagemTexto: string;
  postagemCapa: string;

  downloadURL: Observable<string>;
  urlCroppedIMG: string;
  urlIMG: string;

  constructor(private auth: AuthService, private crudService: CrudService, private camera: Camera,
    private overlay: OverlayService,
    private platform: Platform,
    private file: File,
    private storage: AngularFireStorage,
    private crop: Crop) {
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {
    this.abrirGaleria();
  }

  /* galeria */
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

  /* CRUD POSTAGEM */

  lerPostagens() {
    this.crudService.read_Postagens().subscribe(data => {

      this.postagens = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Titulo: e.payload.doc.data()['Titulo'],
          Texto: e.payload.doc.data()['Texto'],
          Capa: e.payload.doc.data()['Capa'],
        };
      })
      console.log(this.postagens);

    });
  }

  criarPostagem() {
    let record = {};
    record['Titulo'] = this.postagemTitulo;
    record['Texto'] = this.postagemTexto;
    record['Capa'] = this.postagemCapa;
    this.crudService.create_NovaPostagem(record).then(resp => {
      this.postagemTitulo = "";
      this.postagemTexto = "";
      this.postagemCapa = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Postagem(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.editTitulo = record.Titulo;
    record.editTexto = record.Texto;
    record.editCapa = record.Capa;
  }

}
