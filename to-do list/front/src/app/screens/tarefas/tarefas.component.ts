import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tarefa } from 'src/app/core/domain/entity/tarefa';
import { TarefaService } from 'src/app/core/domain/service/tarefa.service';
import { DetalhesTarefaDialog } from './detalhes-tarefa/detalhes-tarefa.dialog';

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
    creator: {
      id: 1,
      name: 'Gabriel Guimarães Bispo',
      dateCreated: new Date(),
      amigos: [],
    },
    tags: ['Saúde', 'Compras'],
  };

  constructor(
    private tarefaService: TarefaService,
    private dialog: MatDialog
  ) {}

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

  abrirdetalhesTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
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
      {
        id: 1,
        name: 'Fazer trabalhos',
        completed: false,
        description: '',
        dateCreated: new Date(),
        lastUpdated: new Date(),
        creator: {
          id: 1,
          name: 'Gabriel Guimarães Bispo',
          dateCreated: new Date(),
          amigos: [],
        },
        tags: ['Estudo', 'Trabalho'],
      },
      this.tarefas
    );
    this.adicionarTarefaExemplo(
      {
        id: 2,
        name: 'Estudar para prova',
        completed: true,
        description: '',
        dateCreated: new Date(),
        lastUpdated: new Date(),
        creator: {
          id: 1,
          name: 'Gabriel Guimarães Bispo',
          dateCreated: new Date(),
          amigos: [],
        },
        tags: ['Estudo', 'Prova'],
      },
      this.tarefas
    );
    this.adicionarTarefaExemplo(
      {
        id: 3,
        name: 'Ir à biblioteca',
        completed: false,
        description: '',
        dateCreated: new Date(),
        lastUpdated: new Date(),
        creator: {
          id: 1,
          name: 'Gabriel Guimarães Bispo',
          dateCreated: new Date(),
          amigos: [],
        },
        tags: ['Estudo', 'Leitura'],
      },
      this.tarefas
    );
  }
}
