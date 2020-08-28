import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { IonSlides, NavController } from '@ionic/angular';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  @ViewChild('slides-artigos', null) slidesArt: IonSlides;
  @ViewChild('slides-videos', null) slidesVid: IonSlides;
  @ViewChild('slides-podcasts', null) slidesPodcasts: IonSlides;
  slidesArtOptions: any;
  slidesVidOptions: any;
  slidesPodOptions: any;
  postagens: any;

  constructor(
    private crudService: CrudService,
    private streamingMedia: StreamingMedia,
    private nav: NavController
  ) {
    this.slidesArtOptions = {
      initialSlide: 0,
      slidesPerView: 1.75,
      effect: 'fade',
      autoHeight: true
    };

    this.slidesVidOptions = {
      initialSlide: 0,
      slidesPerView: 1,
      effect: 'fade',
      autoHeight: true
    };

    this.slidesPodOptions = {
      initialSlide: 0,
      slidesPerView: 1,
      effect: 'fade',
      autoHeight: true
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.lerPostagens();
    }, 1000)
  }

  lerPostagens() {
    this.crudService.read_Postagens().subscribe(data => {
      this.postagens = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          titulo: e.payload.doc.data()['titulo'],
          texto: e.payload.doc.data()['texto'],
          capa: e.payload.doc.data()['capa'],
          usuario: e.payload.doc.data()['usuario'],
          tipo: e.payload.doc.data()['tipo']
        };
      })
    });
  }

  play(postagem) {
    /*let options: StreamingVideoOptions = {
      shouldAutoClose: true,
      controls: true
    };
    this.streamingMedia.playVideo(capa, options);*/

    this.nav.navigateForward('/inicio/detalhes/' + postagem.id);
  }

}
