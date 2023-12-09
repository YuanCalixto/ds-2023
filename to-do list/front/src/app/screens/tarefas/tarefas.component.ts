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

  //Um exemplo de tarefa
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

  ngOnInit(): void {
    this.carregarTodasTarefas();
    this.carregarExemplos();
  }

  adicionarTarefa(): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa: {} as Tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefa: Tarefa) => {
      if (tarefa) {
        this.tarefaService.createTarefa(tarefa).subscribe(
          (novaTarefa) => {
            if (!this.tarefas.some((t) => t.id === novaTarefa.id)) {
              this.tarefas.push(novaTarefa);
            }
          },
          (erro) => console.error('Erro ao adicionar tarefa:', erro)
        );
      }
    });
  }

  editarTarefa(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefaEditada: Tarefa) => {
      if (tarefaEditada) {
        this.tarefaService.updateTarefa(tarefa.id, tarefaEditada).subscribe(
          (atualizadaTarefa) => {
            const index = this.tarefas.findIndex(
              (t) => t.id === atualizadaTarefa.id
            );
            if (index !== -1) {
              this.tarefas[index] = atualizadaTarefa;
            }
          },
          (erro) => console.error('Erro ao editar tarefa:', erro)
        );
      }
    });
  }

  removerTarefa(tarefa: Tarefa): void {
    this.tarefaService.deleteTarefa(tarefa.id).subscribe(
      () => {
        this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
      },
      (erro) => console.error('Erro ao remover tarefa:', erro)
    );
  }

  //Exemplos

  adicionarTarefaExemplo(): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa: {} as Tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefa: Tarefa) => {
      if (tarefa) {
        this.tarefas.push(tarefa);
      }
    });
  }

  editarTarefaExemplo(tarefa: Tarefa): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefaEditada: Tarefa) => {
      if (tarefaEditada) {
        const index = this.tarefas.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) {
          this.tarefas[index] = { ...tarefa, ...tarefaEditada };
        }
      }
    });
  }

  removerTarefaExemplo(tarefa: Tarefa): void {
    this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
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
    const exemplos: Tarefa[] = [
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
    ];

    exemplos.forEach((exemplo) => this.tarefas.push(exemplo));
  }
}
