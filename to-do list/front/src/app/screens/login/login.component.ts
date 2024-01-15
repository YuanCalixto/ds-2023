import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/domain/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: { login: string; password: string } = { login: '', password: '' };
  darkMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const darkModeValue = localStorage.getItem('darkmode');

    this.darkMode = darkModeValue === 'true';
  }

  login() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('usuarioLogado', JSON.stringify(response));
        this.router.navigate(['/tasks']);
      },
      (error) => {}
    );
  }

  loginSample() {
    this.authService.loginSample(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('usuarioLogado', JSON.stringify(response));
        this.router.navigate(['/tasks']);
      },
      (error) => {}
    );
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkmode', JSON.stringify(this.darkMode));
  }
}
