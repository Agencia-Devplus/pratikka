import { Component, OnInit } from '@angular/core';
import { MediaCapture, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { OverlayService } from 'src/app/core/services/overlay.service';
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit {


  constructor(
    private mediaCapture: MediaCapture,
    private overlay: OverlayService
  ) { }

  ngOnInit() {

  }

  ionViewDidLoad() {

  }

  capturarAudio() {
    let opcoes: CaptureAudioOptions = {
      limit: 1,
      duration: 30
    }
    try {
      this.mediaCapture.captureAudio().then(() => { })
    } catch (e) {
      this.overlay.alert({
        message: "Erro ao capturar áudio: " + e
      })
    }

  }
}
