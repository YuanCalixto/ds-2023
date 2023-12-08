import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { TarefasComponent } from './tarefas.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TarefasRoutingModule } from './tarefas-routing.module';

@NgModule({
  declarations: [
    TarefasComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCheckboxModule,
    FormsModule,
    TarefasRoutingModule
  ]
})
export class TarefasModule { }
