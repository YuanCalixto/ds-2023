import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from 'src/app/core/domain/entity/tarefa';

@Component({
  selector: 'detalhes-tarefa-app',
  templateUrl: './detalhes-tarefa.dialog.html',
  styleUrls: ['./detalhes-tarefa.dialog.css'],
})
export class DetalhesTarefaDialog implements OnInit {
  
  editarTarefa(): void {}

  excluirTarefa(): void {}

  tarefa: Tarefa;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { tarefa: Tarefa }) {
    this.tarefa = data.tarefa;
  }

  ngOnInit() {}
}
