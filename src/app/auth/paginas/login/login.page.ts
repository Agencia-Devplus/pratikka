import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    acao: 'Entrar',
    mudarAcao: 'Criar Conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private rotaAtiva: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.criarFormulario();

  }

  private criarFormulario(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get nome(): FormControl {
    return <FormControl>this.formLogin.get('nome');
  }

  get email(): FormControl {
    return <FormControl>this.formLogin.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.formLogin.get('password');
  }

  mudarAuthAcao(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.acao = isSignIn ? 'Login' : 'Criar Conta';
    this.configs.mudarAcao = isSignIn ? 'Criar Conta' : 'Já tenho uma Conta';
    !isSignIn ? this.formLogin.addControl('nome', this.nameControl) : this.formLogin.removeControl('nome');
  }

  async aoClicarEntrar(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credenciais = await this.authService.autenticar({
        isSignIn: this.configs.isSignIn,
        user: this.formLogin.value,
        provider
      });

      this.navCtrl.navigateForward(this.rotaAtiva.snapshot.queryParamMap.get('redirect') || '/inicio/painel/timeline');

    } catch (e) {
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }

}
