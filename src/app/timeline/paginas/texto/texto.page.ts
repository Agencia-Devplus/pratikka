import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CrudService } from 'src/app/core/services/crud.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Platform, IonSlides } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Crop } from '@ionic-native/crop/ngx';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.page.html',
  styleUrls: ['./texto.page.scss'],
})
export class TextoPage implements OnInit {

  slideOptions = {
    autoplay: true,
    zoom: {
      maxRatio: 5
    }
  };

  user: firebase.User;

  postagens: any;
  postagemTitulo: string;
  postagemTexto: string;
  postagemCapa: string;

  downloadURL: Observable<string>;
  urlCroppedIMG: string;
  urlIMG: string;

  public uploadPercent: Observable<number>;
  useURI = true;

  constructor(private auth: AuthService, private crudService: CrudService, private camera: Camera,
    private overlay: OverlayService,
    private platform: Platform,
    private file: File,
    private storage: AngularFireStorage,
    private crop: Crop,
    public router:Router) {
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {

  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  /* galeria */
  async abrirGaleria(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    try {
      const fileUri: string = await this.camera.getPicture(options);
      let file: string;

      if (this.platform.is('ios')) {
        file = fileUri.split('/').pop();
      } else {
        file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'));
      }
      //path armazena o caminho do arquivo
      const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
      //passando imagem como arquivo binário
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      //conversão do arquivo binário da imagem em imagem
      const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });
      //
      this.uploadPic(blob);

    } catch (error) {
      console.error(error);
    }
  }

  uploadPic(blob: Blob) {
    const ref = this.storage.ref(this.user.uid + '/publicacao/' + new Date() + '.jpg');
    const task = ref.put(blob);

    //progresso em porcentagem
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = ref.getDownloadURL())
    ).subscribe();
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
    record['Usuario'] = this.user.displayName;
    this.crudService.create_NovaPostagem(record).then(resp => {
      this.postagemTitulo = "";
      this.postagemTexto = "";
      this.postagemCapa = "";
      this.user.displayName = "";
      console.log(resp);
      this.router.navigate(['/inicio/painel/perfil'])
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
