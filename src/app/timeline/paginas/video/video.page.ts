import { Component, OnInit } from '@angular/core';
import { MediaCapture, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss']
})
export class VideoPage implements OnInit {

  constructor(
    private mediaCapture: MediaCapture,
    private overlay: OverlayService
  ) { }

  ngOnInit() {

  }

  ionViewDidLoad() {

  }

  capturarVideo() {
    let opcoes: CaptureVideoOptions = {
      limit: 1,
      duration: 30,
      quality: 50
    }

    try {
      this.mediaCapture.captureVideo(opcoes).then(() => {

      })
    } catch (e) {
      this.overlay.alert({
        message: "Erro na captura de vídeo: " + e
      })
    }
  }
}
