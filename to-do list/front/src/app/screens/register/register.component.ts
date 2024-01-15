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
    this.authService.registerSample(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('usuarioLogado', JSON.stringify(response));
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.authService.showMessage('Usuário ou senha incorretos.');
      }
    );
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkmode', JSON.stringify(this.darkMode));
  }
}
