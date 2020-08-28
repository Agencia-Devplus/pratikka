import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  user: firebase.User;


  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) { }

  /* CRUD POSTAGENS */
  create_NovaPostagem(record: { imgDown: any; fullPathImg: any; userID: any; userUID: any; }, values: { texto: any; titulo: any; }) {
    let insert = {
      capa: record.imgDown,
      fullPathImg: record.fullPathImg,
      usuario: record.userID,
      id: record.userUID,
      texto: values.texto,
      titulo: values.titulo,
      isEdit: false,
      tipo: 'texto'
    }
    return this.firestore.collection('postagens_prattika').add(insert);
  }

  novaPostagemMidia(dados: { titulo: any; urlDownload?: string; fullPath: any; id_usuario: any; nomeUsuario: any; }) {
    let insert = {
      titulo: dados.titulo,
      capa: dados.urlDownload,
      fullPathImg: dados.fullPath,
      id: dados.id_usuario,
      usuario: dados.nomeUsuario,
      tipo: 'video'
    }

    return this.firestore.collection('postagens_prattika').add(insert);
  }

  novaPostagemMidiaAudio(dados: { titulo: any; urlDownload?: string; fullPath: any; id_usuario: any; nomeUsuario: any; }) {
    let insert = {
      titulo: dados.titulo,
      capa: dados.urlDownload,
      fullPathImg: dados.fullPath,
      id: dados.id_usuario,
      usuario: dados.nomeUsuario,
      tipo: 'audio'
    }

    return this.firestore.collection('postagens_prattika').add(insert);
  }

  read_Postagens() {
    return this.firestore.collection('postagens_prattika').snapshotChanges();
  }

  read_PostagensUsuario(userID: string) {
    return this.firestore.collection('postagens_prattika', ref => ref.where('usuario', '==', userID)).snapshotChanges();
  }

  update_Postagem(recordID: string, record: Partial<unknown>) {
    this.firestore.doc('postagens_prattika/' + recordID).update(record);
  }

  delete_Postagem(id: string) {
    this.firestore.collection('postagens_prattika').doc(id).delete();
  }

  delete_PostagemImg(fullPath: string) {
    return this.storage.ref(fullPath).delete();
  }

  detail_Postagem(recordID: string) {
    return this.firestore.collection('postagens_prattika').doc(recordID).get();
  }
  /* FIM CRUD POSTAGENS */
}
