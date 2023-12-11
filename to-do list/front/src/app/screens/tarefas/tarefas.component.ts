import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lists } from 'src/app/core/domain/entity/lists';
import { Tarefa } from 'src/app/core/domain/entity/tarefa';
import { Usuario } from 'src/app/core/domain/entity/usuario';
import { TarefaService } from 'src/app/core/domain/service/tarefa.service';
import { DetalhesTarefaDialog } from './detalhes-tarefa/detalhes-tarefa.dialog';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  listas: Lists[] = [];
  amigos: Usuario[] = [];

  // Um exemplo de tarefa
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
    tags: [
      { id: 1, name: 'Saúde', dateCreated: new Date() },
      { id: 2, name: 'Compras', dateCreated: new Date() },
    ],
  };

  constructor(
    private tarefaService: TarefaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.adicionarUsuariosExemplo();
    this.adicionarListaExemplo();
    this.adicionarListaExemplo();
    this.adicionarListaExemplo();
    this.carregarTodasTarefas();
    this.carregarExemplos();
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
    this.carregarTodasTarefas();
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
    this.carregarTodasTarefas();
  }

  removerTarefa(tarefa: Tarefa): void {
    this.tarefaService.deleteTarefa(tarefa.id).subscribe(
      () => {
        this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id);
      },
      (erro) => console.error('Erro ao remover tarefa:', erro)
    );
  }

  onSidenavTitleClick(): void {
    console.log('Título da sidenav clicado!');
  }

  // Exemplos

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
        tags: [
          { id: 3, name: 'Estudo', dateCreated: new Date() },
          { id: 4, name: 'Trabalho', dateCreated: new Date() },
        ],
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
        tags: [
          { id: 5, name: 'Estudo', dateCreated: new Date() },
          { id: 6, name: 'Prova', dateCreated: new Date() },
        ],
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
        tags: [],
      },
    ];

    exemplos.forEach((exemplo) => this.tarefas.push(exemplo));
  }

  adicionarListaExemplo(): void {
    const listaExemplo: Lists = {
      id: this.listas.length + 1,
      name: 'Lista Exemplo ' + (this.listas.length + 1),
      dateCreated: new Date(),
      tasks: [
        {
          id: 1,
          name: 'Tarefa 1',
          description: 'Descrição da Tarefa 1',
          completed: false,
          creator: {
            id: 1,
            name: 'Usuário Exemplo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [],
        },
      ],
    };

    this.listas.push(listaExemplo);
  }

  adicionarUsuariosExemplo(): void {
    const exemplos: Usuario[] = [
      {
        id: 1,
        name: 'Gabriel Guimarães Bispo',
        dateCreated: new Date(),
        amigos: [
          {
            id: 2,
            name: 'Amigo 1',
            dateCreated: new Date(),
            amigos: [],
          },
          {
            id: 3,
            name: 'Amigo 2',
            dateCreated: new Date(),
            amigos: [],
          },
        ],
      },
    ];

    exemplos.forEach((exemplo) => this.amigos.push(exemplo));
  }
}
