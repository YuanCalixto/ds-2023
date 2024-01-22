import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/domain/service/auth.service';
import { MaterialModule } from 'src/app/core/material/material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginRoutingModule,
    MaterialModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [AuthService],
})
export class LoginModule {}
