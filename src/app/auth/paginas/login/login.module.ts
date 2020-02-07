import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { CompartilhadoModule } from 'src/app/compartilhado/compartilhado.module';


@NgModule({
  imports: [
    CompartilhadoModule,    
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
