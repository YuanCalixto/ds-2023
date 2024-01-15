import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from 'src/app/core/domain/service/task.service';
import { MaterialModule } from 'src/app/core/material/material.module';
import { TasksDetailsModule } from './task-details/tasks-details.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { ListService } from 'src/app/core/domain/service/list.service';
import { ListDetailsModule } from './list-details/list-details.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    TasksDetailsModule,
    ListDetailsModule,
    TasksRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [ListService, TaskService],
})
export class TasksModule {}
