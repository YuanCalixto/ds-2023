import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {
  adicionarTarefa() {
    throw new Error('Method not implemented.');
  }

  tarefasFaculdade = [
    { nome: 'Fazer trabalhos', feita: false },
    { nome: 'Estudar para prova', feita: true },
    { nome: 'Ir à biblioteca', feita: false }
  ];

  tarefasAmigos = [
    { nome: 'Ligar para o Gabriel', feita: true },
    { nome: 'Marcar encontro com o Yuan', feita: false },
    { nome: 'Visitar a Kauä', feita: false }
  ];

  ngOnInit() {}

  removerTarefa(tarefa: any): void {
    const index = this.tarefasFaculdade.indexOf(tarefa);
    if (index !== -1) {
      this.tarefasFaculdade.splice(index, 1);
    }
  }
}
