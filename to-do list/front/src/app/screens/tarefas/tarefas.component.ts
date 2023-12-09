import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/core/domain/entity/tarefa';
import { TarefaService } from 'src/app/core/domain/service/tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];

  tarefa: Tarefa = {
    id: 1,
    name: 'Tarefa Exemplo',
    completed: false,
    description: 'Exercícios de matemática e física',
    dateCreated: new Date(),
    lastUpdated: new Date(),
  };

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.carregarTodasTarefas();
    this.carregarExemplos();
  }

  adicionarTarefa(tarefa: Tarefa, lista: Tarefa[]): void {
    this.tarefaService.createTarefa(tarefa).subscribe(
      (novaTarefa) => {
        lista.push(novaTarefa);
      },
      (erro) => {
        console.error('Erro ao adicionar tarefa:', erro);
      }
    );
  }

  adicionarTarefaExemplo(tarefa: Tarefa, lista: Tarefa[]): void {
    lista.push(tarefa);
  }

  removerTarefa(tarefa: Tarefa, lista: Tarefa[]): void {
    this.tarefaService.deleteTarefa(tarefa.id).subscribe(
      () => {
        const index = lista.indexOf(tarefa);
        if (index !== -1) {
          lista.splice(index, 1);
        }
      },
      (erro) => {
        console.error('Erro ao remover tarefa:', erro);
      }
    );
  }

  removerTarefaExemplo(tarefa: Tarefa, lista: Tarefa[]): void {
        const index = lista.indexOf(tarefa);
        if (index !== -1) {
          lista.splice(index, 1);
        }
      }

  private carregarTodasTarefas(): void {
    this.tarefaService.getAllTarefas().subscribe(
      (tarefas) => {
        this.tarefas = tarefas;
      },
      (erro) => {
        console.error('Erro ao carregar todas as tarefas:', erro);
      }
    );
  }

  private carregarExemplos(): void {
    this.adicionarTarefaExemplo(
      { id: 1, name: 'Fazer trabalhos', completed: false, description: '', dateCreated: new Date(), lastUpdated: new Date() },
      this.tarefas
    );
    this.adicionarTarefaExemplo(
      { id: 2, name: 'Estudar para prova', completed: true, description: '', dateCreated: new Date(), lastUpdated: new Date() },
      this.tarefas
    );
    this.adicionarTarefaExemplo(
      { id: 3, name: 'Ir à biblioteca', completed: false, description: '', dateCreated: new Date(), lastUpdated: new Date() },
      this.tarefas
    );
  }
}
