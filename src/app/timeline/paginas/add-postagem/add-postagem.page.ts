import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { TextoPage } from '../texto/texto.page';
import { PodcastPage } from '../podcast/podcast.page';
import { VideoPage } from '../video/video.page';

@Component({
  selector: 'app-add-postagem',
  templateUrl: './add-postagem.page.html',
  styleUrls: ['./add-postagem.page.scss'],
})
export class AddPostagemPage implements OnInit {

  @ViewChild(SuperTabs, { static: false }) superTabs: SuperTabs;

  textoPage = TextoPage;
  podcastPage = PodcastPage;
  videoPage = VideoPage;

  configs: SuperTabsConfig = {
    sideMenu: 'left'
  };

  constructor() {
  }

  ngOnInit() {
  }


}
