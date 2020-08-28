import { Component, OnInit } from '@angular/core';
import {
  MediaCapture,
  CaptureVideoOptions,
  MediaFile,
  CaptureError,
} from '@ionic-native/media-capture/ngx';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

const MEDIA_FOLDER_NAME = 'Prattika Videos';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  user: firebase.User;
  arquivos = [];
  videoFullPath = '';
  urlDownloadVideo = '';

  constructor(
    private auth: AuthService,
    private mediaCapture: MediaCapture,
    private overlay: OverlayService,
    private file: File,
    private plt: Platform,
    private acoes: ActionSheetController,
    private play: StreamingMedia,
    private storage: AngularFireStorage,
    private crud: CrudService,
    private camera: Camera
  ) {
    this.auth.authState$.subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      const path = this.file.externalApplicationStorageDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          this.carregarArquivos();
        },
        (err) => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
    });
  }

  carregarArquivos() {
    this.file
      .listDir(this.file.externalApplicationStorageDirectory, MEDIA_FOLDER_NAME)
      .then(
        (res) => {
          this.arquivos = res;
        },
        (err) => console.log('error loading files: ', err)
      );
  }

  ionViewDidLoad() {}

  capturarVideo() {
    /* const opcoes: CaptureVideoOptions = {
      limit: 1,
      duration: 30,
      quality: 50,
    };

    try {
      this.mediaCapture.captureVideo(opcoes).then(
        (video: MediaFile[]) => {
          if (video.length > 0) {
            this.copiarParaDiretorioLocal(video[0].fullPath);
          }
        },
        (err: CaptureError) => console.error(err)
      );
    } catch (e) {
      this.overlay.alert({
        message: 'Erro na captura de vídeo: ' + e,
      });
    } */
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then( async (videoURL) => {
      if (videoURL) {
        this.overlay.alert({
          message: videoURL
        });
      }
    });

  }

  copiarParaDiretorioLocal(fullPath) {
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }

    const ext = myPath.split('.').pop();
    const d = Date.now();
    const newName = `${d}.${ext}`;

    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo =
      this.file.externalApplicationStorageDirectory + MEDIA_FOLDER_NAME;

    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      (success) => {
        this.carregarArquivos();
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  async postarVideo(titulo: any, arquivo: FileEntry) {
    const loading = await this.overlay.loading();
    loading.present();
    const path = arquivo.nativeURL.substr(
      0,
      arquivo.nativeURL.lastIndexOf('/') + 1
    );
    const type = this.getMimeType(arquivo.name.split('.').pop());
    const buffer = await this.file.readAsArrayBuffer(path, arquivo.name);
    const fileBlob = new Blob([buffer], type);

    const randomId = Math.random().toString(36).substring(2, 8);
    try {
      const ref = this.storage.ref(
        'prattika/' +
          this.user.uid +
          '/videos/' +
          randomId +
          new Date().getTime() +
          '.' +
          'mp4'
      );

      await ref
        .put(fileBlob)
        .then((snapshot) => {
          this.videoFullPath = snapshot.metadata.fullPath;
        })
        .then(async () => {
          await ref
            .getDownloadURL()
            .toPromise()
            .then((url) => (this.urlDownloadVideo = url));
        });

      let dados = {
        titulo: titulo,
        urlDownload: this.urlDownloadVideo,
        fullPath: this.videoFullPath,
        id_usuario: this.user.uid,
        nomeUsuario: this.user.displayName,
      };

      this.crud.novaPostagemMidia(dados);
      this.removerVideo(arquivo);

      this.overlay.toast({
        message: 'Vídeo postado!',
        buttons: [
          {
            text: 'OK',
          },
        ],
      });
    } catch (e) {
      this.overlay.alert({
        message: e,
        buttons: ['OK'],
      });
    } finally {
      loading.dismiss();
    }
  }

  getMimeType(fileExt) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'jpg') return { type: 'image/jpg' };
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
  }

  removerVideo(arquivo: FileEntry) {
    const path = arquivo.nativeURL.substr(
      0,
      arquivo.nativeURL.lastIndexOf('/') + 1
    );
    this.file.removeFile(path, arquivo.name).then(
      () => {
        this.carregarArquivos();
      },
      (err) => console.log('error remove: ', err)
    );
  }

  async folhaAcoes(arquivo: FileEntry) {
    const acao = await this.acoes.create({
      header: arquivo.name,
      buttons: [
        {
          text: 'Ver Video',
          icon: 'play-sharp',
          handler: () => {
            this.play.playVideo(arquivo.nativeURL);
          },
        },
        {
          text: 'Postar',
          icon: 'arrow-up',
          handler: () => {
            console.log('Postar Vídeo');
            // this.postarVideo(arquivo);
            this.overlay.alert({
              header: 'Insira um título',
              inputs: [
                {
                  name: 'titulo',
                  type: 'text',
                },
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                },
                {
                  text: 'Prosseguir',
                  handler: (data) => {
                    this.postarVideo(data.titulo, arquivo);
                  },
                },
              ],
            });
          },
        },
        {
          text: 'Remover Vídeo',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removerVideo(arquivo);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await acao.present();
  }
}
