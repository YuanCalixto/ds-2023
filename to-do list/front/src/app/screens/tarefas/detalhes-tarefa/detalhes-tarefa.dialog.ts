import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tasks } from 'src/app/core/domain/entity/tasks';

@Component({
  selector: 'detalhes-tarefa-app',
  templateUrl: './detalhes-tarefa.dialog.html',
  styleUrls: ['./detalhes-tarefa.dialog.css'],
})
export class DetalhesTarefaDialog implements OnInit {
  task: Tasks;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Tasks },
    private dialogRef: MatDialogRef<DetalhesTarefaDialog>
  ) {
    this.task = { ...data.task };
  }

  ngOnInit() {}

  editTask(): void {}

  removeTask(): void {}

  saveTask(): void {
    this.dialogRef.close(this.task);
  }
}
