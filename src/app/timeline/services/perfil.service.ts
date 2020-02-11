import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore';
import { Perfil } from '../models/perfil.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends Firestore<Perfil>{

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/usuarios/${user.uid}/perfil`);
        return;
      }
      this.setCollection(null);
    });
  }
}
