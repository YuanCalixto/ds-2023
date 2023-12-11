import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lists } from 'src/app/core/domain/entity/lists';
import { Tasks } from 'src/app/core/domain/entity/tasks';
import { Users } from 'src/app/core/domain/entity/users';
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
    private tasksService: TasksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    //Funcionais
    this.loadAllTasks();
    

    //Exemplos

    this.loadTasksSamples();
    this.addUserSamples();
    this.addListSample();
    this.addListSample();
    this.addListSample();
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
            const index = this.tasks.findIndex(
              (t) => t.id === updatedTask.id
            );
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
    this.tasksService.getTasksByListId(listId).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Erro ao carregar tarefas da lista:', error);
      }
    );
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

  editTaskSample(tarefa: Tasks): void {
    const dialogRef = this.dialog.open(DetalhesTarefaDialog, {
      data: { tarefa },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((tarefaEditada: Tasks) => {
      if (tarefaEditada) {
        const index = this.tasks.findIndex((t) => t.id === tarefa.id);
        if (index !== -1) {
          this.tasks[index] = { ...tarefa, ...tarefaEditada };
        }
      }
    });
  }

  removeTaskSample(tarefa: Tasks): void {
    this.tasks = this.tasks.filter((t) => t.id !== tarefa.id);
  }

  private loadTasksSamples(): void {
    const exemplos: Tasks[] = [
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

    exemplos.forEach((exemplo) => this.tasks.push(exemplo));
  }

  addListSample(): void {
    const listaExemplo: Lists = {
      id: this.lists.length + 1,
      name: 'Lista Exemplo ' + (this.lists.length + 1),
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

    this.lists.push(listaExemplo);
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
