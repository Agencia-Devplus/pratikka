import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: firebase.User;
  constructor(private auth: AuthService) { 
    this.auth.authState$.subscribe(user => (this.user = user));
  }

  ngOnInit() {
  }

}
