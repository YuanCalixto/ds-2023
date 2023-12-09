import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DetalhesTarefaDialog } from './detalhes-tarefa.dialog';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [DetalhesTarefaDialog],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    MatChipsModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalhesTarefaModule {}
