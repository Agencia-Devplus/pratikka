import { Component, OnInit } from "@angular/core";
import { OverlayService } from "src/app/core/services/overlay.service";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import { AuthService } from "src/app/core/services/auth.service";
import { CrudService } from "src/app/core/services/crud.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

const MEDIA_FOLDER_NAME = "Prattika Videos";

@Component({
  selector: "app-video",
  templateUrl: "./video.page.html",
  styleUrls: ["./video.page.scss"],
})
export class VideoPage implements OnInit {
  user: firebase.User;
  arquivos = [];
  videoFullPath = "";
  urlDownloadVideo = "";

  constructor(
    private auth: AuthService,
    private overlay: OverlayService,
    private file: File,
    private storage: AngularFireStorage,
    private crud: CrudService,
    private camera: Camera
  ) {
    this.auth.authState$.subscribe((user) => (this.user = user));
  }

  ngOnInit() {}

  ionViewDidLoad() {}

  capturarVideo() {
    const options: CameraOptions = {
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.camera.getPicture(options).then((video) => {
      this.overlay.alert({
        header: "Qual o título do vídeo?",
        inputs: [
          {
            name: "Titulo",
            type: "text",
            placeholder: "Ex: Meu novo vídeo",
          },
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
          },
          {
            text: "Enviar",
            handler: (titulo) => {
              this.postarVideo(video, titulo);
            },
          },
        ],
      });
    });
  }

  async postarVideo(videoURI, title: string) {
    // const loading = await this.overlay.loading();
    // loading.present();

    return new Promise((res, rej) => {
      let fileName = "";

      this.file
        .resolveLocalFilesystemUrl("file://" + videoURI)
        .then((fileEntry) => {
          let { name, nativeURL } = fileEntry;
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          fileName = name; 
          return this.file.readAsArrayBuffer(path, name);
        }).then(buffer => {
          const fileBlob = new Blob([buffer], {type: 'video/mp4'});
          res({
            fileName,
            fileBlob
          });
        }).catch(e => rej(e));
    });

    /*
    const buffer = await this.file.readAsArrayBuffer();
    const fileBlob = new Blob([buffer], {type: 'video/mp4'});

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

      const dados = {
        titulo: titulo,
        urlDownload: this.urlDownloadVideo,
        fullPath: this.videoFullPath,
        id_usuario: this.user.uid,
        nomeUsuario: this.user.displayName,
      };

      this.crud.novaPostagemMidia(dados);

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
    } */
  }
}
