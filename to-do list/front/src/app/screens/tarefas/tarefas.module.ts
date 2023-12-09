import { CommonModule } from '@angular/common';
import {
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TarefaService } from 'src/app/core/domain/service/tarefa.service';
import { MaterialModule } from 'src/app/core/material/material.module';
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
    TarefasRoutingModule,
  ],
  providers: [TarefaService],
})
export class TarefasModule {}
