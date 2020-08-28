import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonSlides, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'src/app/core/services/crud.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.page.html',
  styleUrls: ['./texto.page.scss'],
})
export class TextoPage implements OnInit {

  slideOptions = {
    autoplay: false,
    zoom: {
      maxRatio: 5
    }
  };
  formGroup: FormGroup;
  blob: Blob;
  user: firebase.User;
  imgSelecionada: string;
  postagemTitulo: string = "";
  postagemTexto: string = "";
  postagemCapa: string = "";
  linkDownloadImagem: string = "";
  linkFullPathImagem: string = "";


  constructor(
    private auth: AuthService,
    private camera: Camera,
    private overlay: OverlayService,
    private crop: Crop,
    private platform: Platform,
    private file: File,
    private formBuilder: FormBuilder,
    private crud: CrudService,
    private storage: AngularFireStorage
  ) {
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formGroup = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      texto: ['', [Validators.required]]
    });
  }

  get titulo(): FormControl {
    return <FormControl>this.formGroup.get('titulo')
  }

  get texto(): FormControl {
    return <FormControl>this.formGroup.get('texto')
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  /* Função imagem */
  async abrirGaleria() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      targetHeight: 1080,
      targetWidth: 1080
    };
    const loading = await this.overlay.loading();
    try {
      await this.camera.getPicture(options).then((imageData) => {
        this.cortarImagem(imageData);
      })
    } catch (error) {
      this.overlay.toast({
        message: 'Erro: ' + error
      })
    } finally {
      loading.dismiss();
    }
  }

  cortarImagem(fileUrl) {
    this.crop.crop(fileUrl)
      .then(
        async newPath => {

          let file: string;
          this.imgSelecionada = (window as any).Ionic.WebView.convertFileSrc(newPath);

          if (this.platform.is('ios')) {
            file = newPath.split('/').pop();
          } else {
            file = newPath.substring(newPath.lastIndexOf('/') + 1, newPath.indexOf('?'));
          }

          const path: string = newPath.substring(0, newPath.lastIndexOf('/'));
          const buffer = await this.file.readAsArrayBuffer(path, file);
          this.blob = new Blob([buffer], { type: 'image/jpeg' });
        },
        error => {
          this.overlay.toast({
            message: 'Erro: ' + error
          })
        }
      );
  }
  /* FIM Função imagem */

  /* Função Texto */


  /* FIM Função Texto */

  async enviarImagem(blob: Blob) {
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);
    try {
      const ref = this.storage.ref('prattika/' + this.user.uid + '/imagens/' + randomId + new Date().getTime() + '.jpg');
      await ref.put(blob).then(snapshot => {
        //this.uploadPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.linkFullPathImagem = snapshot.metadata.fullPath;
      }).then(async () => {
        await ref.getDownloadURL().toPromise().then(url => {
          this.linkDownloadImagem = url
        })
      })
    } catch (e) {
      this.overlay.alert({
        message: "Erro ao enviar a foto: " + e
      })
    }
  }

  async enviar() {
    let loading = await this.overlay.loading();
    loading.present();

    if (this.imgSelecionada == null) {
      loading.dismiss();
      this.overlay.alert({
        message: "Insira uma imagem primeiro!",
        buttons: [
          "OK"
        ]
      })
    } else {
      try {
        let loading = await this.overlay.loading();
        loading.present();
        this.enviarImagem(this.blob).then(() => {

          let record = {
            imgDown: this.linkDownloadImagem,
            fullPathImg: this.linkFullPathImagem,
            userID: this.user.displayName,
            userUID: this.user.uid
          }

          this.crud.create_NovaPostagem(record, this.formGroup.value).then(() => {
            this.overlay.toast({
              message: "Postagem enviada!"
            })
            this.formGroup.reset();
            this.imgSelecionada = "";
            loading.dismiss();
          });

        });

      } catch (e) {
        this.overlay.alert({
          message: e
        })
      } finally {
        loading.dismiss()
      }
    }
  }
}
