import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lists } from 'src/app/core/domain/entity/lists';
import { Tasks } from 'src/app/core/domain/entity/tasks';
import { Users } from 'src/app/core/domain/entity/users';
import { ListsService } from 'src/app/core/domain/service/lists.service';
import { TasksService } from 'src/app/core/domain/service/tasks.service';
import { DetalhesTarefaDialog } from './detalhes-tarefa/detalhes-tarefa.dialog';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  tasks: Tasks[] = [];
  lists: Lists[] = [];
  friends: Users[] = [];

  constructor(
    private listsService: ListsService,
    private tasksService: TasksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Exemplos

    this.addListsSamples();
    this.addUserSamples();

    //Funcionais
    this.loadAllListsByUser();
    this.loadTasksFromFirstList();
  }

  private loadAllTasks(): void {
    this.tasksService.getAllTasks().subscribe(
      (task) => {
        this.tasks = task;
      },
      (error) => {
        console.error('Erro ao carregar todas as tarefas:', error);
      }
    );
  }

  private loadAllListsByUser(): void {
    const userId = 1; // Substituir pelo ID do usuário

    this.listsService.getAllListsByUser(userId).subscribe(
      (lists) => {
        this.lists = lists;
      },
      (error) => {
        console.error('Erro ao carregar listas do usuário:', error);
      }
    );
  }

  private loadTasksFromFirstList(): void {
    const userId = 1; // Substituir pelo ID do usuário

    if (this.lists.length > 0) {
      const firstList = this.lists[0];

      if (firstList.tasks) {
        this.tasks = firstList.tasks;
      } else {
        console.warn('A primeira lista não possui tarefas disponíveis.');
      }
    } else {
      console.warn('O usuário não possui listas disponíveis.');
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { task: {} as Tasks },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((task: Tasks) => {
      if (task) {
        this.tasksService.createTasks(task).subscribe(
          (newTask) => {
            if (!this.tasks.some((t) => t.id === newTask.id)) {
              this.tasks.push(newTask);
            }
          },
          (error) => console.error('Erro ao adicionar tarefa:', error)
        );
      }
    });
    this.loadAllTasks();
  }

  editTask(task: Tasks): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { task: task },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((editedTask: Tasks) => {
      if (editedTask) {
        this.tasksService.updateTasks(task.id, editedTask).subscribe(
          (updatedTask) => {
            const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
          },
          (error) => console.error('Erro ao editar tarefa:', error)
        );
      }
    });
    this.loadAllTasks();
  }

  removeTask(task: Tasks): void {
    this.tasksService.deleteTasks(task.id).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (error) => console.error('Erro ao remover tarefa:', error)
    );
  }

  onSidenavTitleClick(listId: number): void {
    const filteredLists = this.lists.filter((list) => list.id === listId);

    if (filteredLists.length > 0) {
      this.tasks = filteredLists[0].tasks;
    } else {
      console.warn('A lista selecionada não possui tarefas disponíveis.');
    }
  }

  // Exemplos

  addTaskSample(): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa: {} as Tasks },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefa: Tasks) => {
      if (tarefa) {
        this.tasks.push(tarefa);
      }
    });
  }

  editTaskSample(task: Tasks): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { task: task },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefaEditada: Tasks) => {
      if (tarefaEditada) {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = { ...task, ...tarefaEditada };
        }
      }
    });
  }

  removeTaskSample(tarefa: Tasks): void {
    this.tasks = this.tasks.filter((t) => t.id !== tarefa.id);
  }

  addListsSamples(): void {
    const listaExemplo1: Lists = {
      id: this.lists.length + 1,
      name: 'Tarefas da Semana',
      dateCreated: new Date(),
      tasks: [
        {
          id: 1,
          name: 'Fazer compras no supermercado',
          description: 'Comprar os itens essenciais para a semana',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 1, name: 'Compras', dateCreated: new Date() },
            { id: 2, name: 'Essencial', dateCreated: new Date() },
          ],
        },
        {
          id: 2,
          name: 'Ir ao banco',
          description: 'Pagar contas e fazer depósitos',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 3, name: 'Banco', dateCreated: new Date() },
            { id: 4, name: 'Contas', dateCreated: new Date() },
          ],
        },
        {
          id: 3,
          name: 'Limpar a casa',
          description: 'Varrer, passar pano e lavar a louça',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 5, name: 'Limpeza', dateCreated: new Date() },
            { id: 6, name: 'Casa', dateCreated: new Date() },
          ],
        },
      ],
    };

    const listaExemplo2: Lists = {
      id: this.lists.length + 2,
      name: 'Tarefas do Trabalho',
      dateCreated: new Date(),
      tasks: [
        {
          id: 1,
          name: 'Preparar apresentação para reunião',
          description: 'Revisar os slides e preparar notas',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 7, name: 'Apresentação', dateCreated: new Date() },
            { id: 8, name: 'Reunião', dateCreated: new Date() },
          ],
        },
        {
          id: 2,
          name: 'Responder e-mails',
          description: 'Responder às solicitações e dúvidas dos clientes',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 9, name: 'E-mail', dateCreated: new Date() },
            { id: 10, name: 'Clientes', dateCreated: new Date() },
          ],
        },
      ],
    };

    const listaExemplo3: Lists = {
      id: this.lists.length + 3,
      name: 'Tarefas da Faculdade',
      dateCreated: new Date(),
      tasks: [
        {
          id: 1,
          name: 'Finalizar o trabalho de Domínios',
          description: 'Integrar o Back e o Front',
          completed: false,
          creator: {
            id: 1,
            name: 'Gabriel Guimarães Bispo',
            dateCreated: new Date(),
            amigos: [],
          },
          dateCreated: new Date(),
          lastUpdated: new Date(),
          tags: [
            { id: 11, name: 'Faculdade', dateCreated: new Date() },
            { id: 12, name: 'Domínios', dateCreated: new Date() },
          ],
        },
      ],
    };

    this.lists.push(listaExemplo1, listaExemplo2, listaExemplo3);
  }

  addUserSamples(): void {
    const exemplos: Users[] = [
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

    exemplos.forEach((exemplo) => this.friends.push(exemplo));
  }
}
