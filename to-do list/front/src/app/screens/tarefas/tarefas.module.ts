import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TarefaService } from 'src/app/core/domain/service/tarefa.service';
import { MaterialModule } from 'src/app/core/material/material.module';
import { DetalhesTarefaModule } from './detalhes-tarefa/detalhes-tarefa.module';
import { TarefasRoutingModule } from './tarefas-routing.module';
import { TarefasComponent } from './tarefas.component';

@NgModule({
  declarations: [TarefasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    DetalhesTarefaModule,
    TarefasRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [TarefaService],
})
export class TarefasModule {}
