import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonItem, IonIcon, IonInput, IonButton, IonSpinner,
} from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    ReactiveFormsModule, CommonModule,
    IonContent, IonItem, IonIcon, IonInput, IonButton, IonSpinner,
  ],
})
export class LoginPage {
  private formBuilder = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  erro = '';

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.erro = '';

    const { email, senha } = this.loginForm.getRawValue();

    this.auth.login(email, senha).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: () => {
        this.isLoading = false;
        this.erro = 'Email ou senha inválidos';
      },
    });
  }
}
