import { Component, OnInit } from '@angular/core';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media/ngx';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  myVideo: any;
  mediaFiles = [];

  constructor(private mediaCapture: MediaCapture, private media: Media,
    private file: File, private storage: Storage  ) { }

  ngOnInit() {
    this.captureVideo();
  }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      console.log('my file:', capturedFile);
      
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');
      var toDirectory = this.file.dataDirectory;

      this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then(res => {
        let url = res.nativeURL.replace(/^file:\/\//, '');
        this.storeMediaFiles([{ name: fileName, size: capturedFile.size, localURL: url }]);
      });
    });
  }

  /* play(myFile) {
    console.log('play', myFile);
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  } */

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
