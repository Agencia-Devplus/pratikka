import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  /* CRUD POSTAGENS */
  create_NovaPostagem(record) {
    return this.firestore.collection('Postagens').add(record);
  }
 
  read_Postagens() {
    return this.firestore.collection('Postagens').snapshotChanges();
  }
 
  update_Postagem(recordID,record){
    this.firestore.doc('Postagens/' + recordID).update(record);
  }
 
  delete_Postagem(record_id) {
    this.firestore.doc('Postagens/' + record_id).delete();
  }
  /* FIM CRUD POSTAGENS */
}
