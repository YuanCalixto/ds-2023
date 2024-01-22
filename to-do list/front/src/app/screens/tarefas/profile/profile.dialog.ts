import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/domain/service/auth.service';

@Component({
  selector: 'profile-dialog',
  templateUrl: './profile.dialog.html',
  styleUrls: ['./profile.dialog.css'],
})
export class ProfileDialog implements OnInit {
  user: { id: string; login: string; password: string } = {
    id: '',
    login: '',
    password: '',
  };

  constructor(
    private dialogRef: MatDialogRef<ProfileDialog>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = localStorage.getItem('usuarioLogado');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  updateUser(): void {
    if (!this.user.login || !this.user.password) {
      this.authService.showMessage('Usuário e senha são obrigatórios.');
    } else if (this.user.login.trim().length < 1) {
      this.authService.showMessage('Usuário não pode ser vazio.');
    } else if (this.user.password.trim().length < 8) {
      this.authService.showMessage(
        'A senha deve ter pelo menos 8 caracteres válidos.'
      );
    } else {
      this.authService.updateUserSample(this.user).subscribe(
        (updatedUser) => {
          localStorage.setItem('usuarioLogado', JSON.stringify(updatedUser));
          this.authService.showMessage('Usuário atualizado com sucesso');
          this.dialogRef.close(updatedUser);
        },
        (error) => {
          this.authService.showMessage('Erro ao atualizar usuário.');
        }
      );
    }
  }
}
