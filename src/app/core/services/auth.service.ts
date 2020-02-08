import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User, AuthOptions, AuthProvider } from './auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.authState$ = this.angularFireAuth.authState;

  }

  get estaAutenticado(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  autenticar({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operacao: Promise<auth.UserCredential>;
    if (provider !== AuthProvider.Email) {
      operacao = null;
    } else {
      operacao = isSignIn ? this.entrarComEmaileSenha(user) : this.criarContaComEmail(user);
    }
    return operacao;
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  private entrarComEmaileSenha({ email, password }: User): Promise<auth.UserCredential> {    
    
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private criarContaComEmail({ email, password, nome }: User): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(
      credenciais =>
        credenciais.user.updateProfile({ displayName: nome, photoURL: null }).then(() => credenciais)
    )
  }
}
