import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { List } from 'src/app/core/domain/entity/list';
import { Task } from 'src/app/core/domain/entity/task';
import { User } from 'src/app/core/domain/entity/user';
import { ListsService } from 'src/app/core/domain/service/lists.service';
import { TasksService } from 'src/app/core/domain/service/tasks.service';
import { TasksDetailsDialog } from './detalhes-tarefa/tasks-details.dialog';
import { ListDetailsDialog } from './list-details/list-details.dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  usuarioLogado: User = {} as User;
  darkMode: boolean = false;
  selectedListId = '';

  tasks: Task[] = [];
  lists: List[] = [];
  friends: User[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private listsService: ListsService,
    private tasksService: TasksService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    this.usuarioLogado = usuarioLogadoString
      ? JSON.parse(usuarioLogadoString)
      : null;

      const darkModeValue = localStorage.getItem('darkmode');

      this.darkMode = darkModeValue === 'true';
  

    this.loadAllListsByUser();
    this.loadTasksFromFirstList();
  }

  private loadAllListsByUser(): void {
    this.listsService.getAllListsByUser(this.usuarioLogado.id).subscribe(
      (lists) => {
        this.lists = lists;
      },
      (error) => {
        console.error('Erro ao carregar listas do usuário:', error);
      }
    );
  }

  private loadTasksFromFirstList(): void {
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

  private loadTasksFromSelectedList(): void {
    if (this.selectedListId) {
      this.tasksService.getTasksByListId(this.selectedListId).subscribe(
        (tasks) => {
          this.tasks = tasks;
        },
        (error) => {
          console.error('Erro ao obter tarefas da lista:', error);
        }
      );
    } else {
      console.warn('Nenhuma lista selecionada.');
    }
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TasksDetailsDialog, {
      data: { task: {} as Task },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        task.listId = this.selectedListId;
        task.creator = this.usuarioLogado;
        task.completed = false;
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

    this.loadTasksFromSelectedList();
  }

  addList(): void {
    const dialogRef = this.dialog.open(ListDetailsDialog, {
      data: { list: {} as List },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((list: List) => {
      if (list) {
        list.user = this.usuarioLogado;
        this.listsService.createList(list).subscribe(
          (newList) => {
            if (!this.lists.some((t) => t.id === newList.id)) {
              this.lists.push(newList);
            }
            this.loadAllListsByUser();
          },
          (error) => console.error('Erro ao adicionar lista:', error)
        );
      }
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TasksDetailsDialog, {
      data: { task: task },
      width: '500px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((editedTask: Task) => {
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

    this.loadTasksFromSelectedList();
  }

  removeTask(task: Task): void {
    this.tasksService.deleteTasks(task.id).subscribe(
      () => {
        const indexToRemove = this.tasks.findIndex(t => t.id === task.id);
        if (indexToRemove !== -1) {
          this.tasks.splice(indexToRemove, 1);
          this.loadTasksFromSelectedList();
        }
      },
      (error) => console.error('Erro ao remover tarefa:', error)
    );
  }
  
  

  onSidenavTitleClick(listId: string): void {
    this.selectedListId = listId.toString();

    this.loadTasksFromSelectedList();
  }
}
