import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarefa } from 'src/app/core/domain/entity/tarefa';

@Component({
  selector: 'detalhes-tarefa-app',
  templateUrl: './detalhes-tarefa.dialog.html',
  styleUrls: ['./detalhes-tarefa.dialog.css'],
})
export class DetalhesTarefaDialog implements OnInit {
  tarefa: Tarefa;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tarefa: Tarefa },
    private dialogRef: MatDialogRef<DetalhesTarefaDialog>
  ) {
    this.tarefa = { ...data.tarefa };
  }

  ngOnInit() {}

  editarTarefa(): void {}

  excluirTarefa(): void {}

  salvarTarefa(): void {
    this.dialogRef.close(this.tarefa);
  }
}
