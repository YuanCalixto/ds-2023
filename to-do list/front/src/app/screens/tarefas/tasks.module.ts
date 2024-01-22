import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from 'src/app/core/domain/service/list.service';
import { TaskService } from 'src/app/core/domain/service/task.service';
import { UserListService } from 'src/app/core/domain/service/user-list.service';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ListDeleteModule } from './list-delete/list-delete.module';
import { ListDetailsModule } from './list-details/list-details.module';
import { ProfileModule } from './profile/profile.module';
import { ShareListModule } from './share-list/share-list.module';
import { TaskDeleteModule } from './task-delete/task-delete.module';
import { TasksDetailsModule } from './task-details/tasks-details.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MaterialModule,
    MatIconModule,

    ProfileModule,
    ListDeleteModule,
    ListDetailsModule,
    ShareListModule,
    TaskDeleteModule,
    TasksDetailsModule,
    TasksRoutingModule,
  ],
  providers: [ListService, TaskService, UserListService],
})
export class TasksModule {}
