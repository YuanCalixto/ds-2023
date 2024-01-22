import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/domain/entity/task';

@Component({
  selector: 'task-delete-app',
  templateUrl: './task-delete.dialog.html',
  styleUrls: ['./task-delete.dialog.css'],
})
export class TaskDeleteDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public task: Task,
    private dialogRef: MatDialogRef<TaskDeleteDialog>
  ) {}

  ngOnInit() {}

  removeTask(): void {
    this.dialogRef.close(true);
  }

  keepTask(): void {
    this.dialogRef.close(false);
  }
}
