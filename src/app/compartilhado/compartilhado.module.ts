import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BotaoLogoutComponent } from './componentes/botao-logout/botao-logout.component';

@NgModule({
    declarations: [BotaoLogoutComponent],
    imports: [IonicModule],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        BotaoLogoutComponent
    ]
})
export class CompartilhadoModule { }
