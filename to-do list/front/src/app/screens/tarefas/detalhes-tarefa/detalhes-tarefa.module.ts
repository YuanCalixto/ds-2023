import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { DetalhesTarefaDialog } from './detalhes-tarefa.dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetalhesTarefaDialog],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalhesTarefaModule {}