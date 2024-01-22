import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/domain/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loginData: { login: string; password: string } = { login: '', password: '' };
  darkMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const darkModeValue = localStorage.getItem('darkmode');
    this.darkMode = darkModeValue === 'true';
  }

  ngAfterViewInit() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado !== null) {
      this.router.navigate(['/tasks']);
    }
  }

  registerSample() {
    if (!this.loginData.login || !this.loginData.password) {
      this.authService.showMessage('Usuário e senha são obrigatórios.');
    } else if (this.loginData.login.trim().length < 1) {
      this.authService.showMessage('Usuário não pode ser vazio.');
    } else if (this.loginData.password.trim().length < 8) {
      this.authService.showMessage(
        'A senha deve ter pelo menos 8 caracteres válidos.'
      );
    } else {
      this.authService.registerSample(this.loginData).subscribe(
        (response) => {
          localStorage.setItem('usuarioLogado', JSON.stringify(response));
          this.router.navigate(['/tasks']);
        },
        (error) => {
          this.authService.showMessage('Nome de usuário já utilizado');
        }
      );
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkmode', JSON.stringify(this.darkMode));
  }
}
