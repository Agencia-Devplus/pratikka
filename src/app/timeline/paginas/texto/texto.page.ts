import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Platform, IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

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

  constructor(private auth: AuthService) {
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

}
