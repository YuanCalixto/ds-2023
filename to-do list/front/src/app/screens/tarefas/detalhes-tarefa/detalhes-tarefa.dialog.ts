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

  newTag: string = '';

  tagInput = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Tasks },
    private dialogRef: MatDialogRef<DetalhesTarefaDialog>
  ) {
    this.task = { ...data.task };
  }

  ngOnInit() {}

  saveTask(): void {
    this.dialogRef.close(this.task);
  }

  addTag(): void {
    if (this.newTag.trim() !== '') {
      const newTag = {
        id: this.task.tags.length + 1,
        name: this.newTag,
        dateCreated: new Date(),
      };
      this.task.tags.push(newTag);
      this.newTag = '';
    }
  }

  removeTag(tagToRemove: any): void {
    this.task.tags = this.task.tags.filter((tag) => tag.id !== tagToRemove.id);
  }

  toggleTagInput(): void {
    this.tagInput = !this.tagInput;
  }
}
