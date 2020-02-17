import { Component, OnInit } from '@angular/core';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Storage } from '@ionic/storage';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit {
  mediaFiles = [];

  constructor(private mediaCapture: MediaCapture,
    private storage: Storage) { }

  ngOnInit() {
    this.captureAudio();
  }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureAudio() {
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    });
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }

}
