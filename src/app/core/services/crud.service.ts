import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  user: firebase.User;
  

  constructor(private firestore: AngularFirestore, private auth: AuthService) { }

  /* CRUD POSTAGENS */
  create_NovaPostagem(record) {
    return this.firestore.collection('Postagens').add(record);
  }
 
  read_Postagens() {
    return this.firestore.collection('Postagens').snapshotChanges();
  }

  read_PostagensUsuario(userID) {
    return this.firestore.collection('Postagens', ref => ref.where('Usuario','==', userID)).snapshotChanges();
  }
 
  update_Postagem(recordID,record){
    this.firestore.doc('Postagens/' + recordID).update(record);
  }
 
  delete_Postagem(record_id) {
    this.firestore.doc('Postagens/' + record_id).delete();
  }
  /* FIM CRUD POSTAGENS */
}
