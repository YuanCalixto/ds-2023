import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { List } from 'src/app/core/domain/entity/list';
import { Task } from 'src/app/core/domain/entity/task';
import { User } from 'src/app/core/domain/entity/user';
import { UserList } from 'src/app/core/domain/entity/user-list';
import { ListService } from 'src/app/core/domain/service/list.service';
import { TaskService } from 'src/app/core/domain/service/task.service';
import { UserListService } from 'src/app/core/domain/service/user-list.service';
import { ListDetailsDialog } from './list-details/list-details.dialog';
import { ShareListDialog } from './share-list/share-list.dialog';
import { TasksDetailsDialog } from './task-details/tasks-details.dialog';

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
  sharedLists: UserList[] = [];
  friends: User[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private listsService: ListService,
    private tasksService: TaskService,
    private userListService: UserListService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    this.usuarioLogado = usuarioLogadoString
      ? JSON.parse(usuarioLogadoString)
      : null;

    const darkModeValue = localStorage.getItem('darkmode');

    this.darkMode = darkModeValue === 'true';

    this.loadAllListsByUser();
    this.loadAllSharedListsByUser();
    this.loadTasksFromFirstList();
  }

  loadAllListsByUser(): void {
    this.listsService.getAllListsByUser(this.usuarioLogado.id).subscribe(
      (lists) => {
        this.lists = lists;
      },
      (error) => {
        console.error('Erro ao carregar listas do usuário:', error);
      }
    );
  }

  loadAllSharedListsByUser(): void {
    this.userListService.getUserListByUser(this.usuarioLogado.id).subscribe(
      (lists) => {
        this.sharedLists = lists;
      },
      (error) => {
        console.error('Erro ao carregar listas do usuário:', error);
      }
    );
  }

  loadTasksFromFirstList(): void {
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

  loadTasksFromSelectedList(): void {
    if (this.selectedListId) {
      this.tasksService.getTasksByListId(this.selectedListId).subscribe(
        (tasks) => {
          console.log(tasks);
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
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        task.listId = this.selectedListId;
        task.user = this.usuarioLogado;
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
            this.selectList(newList.id);
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
        const indexToRemove = this.tasks.findIndex((t) => t.id === task.id);
        if (indexToRemove !== -1) {
          this.tasks.splice(indexToRemove, 1);
          this.loadTasksFromSelectedList();
        }
      },
      (error) => console.error('Erro ao remover tarefa:', error)
    );
  }

  removeList(list: List): void {
    this.listsService.deleteList(list.id).subscribe(
      () => {
        const indexToRemove = this.lists.findIndex((t) => t.id === list.id);
        if (indexToRemove !== -1) {
          this.lists.splice(indexToRemove, 1);
          this.loadTasksFromSelectedList();
          this.selectedListId = '';
        }
      },
      (error) => console.error('Erro ao remover lista:', error)
    );
  }

  removeSharedList(list: List): void {
    this.listsService.deleteList(list.id).subscribe(
      () => {
        const indexToRemove = this.lists.findIndex((t) => t.id === list.id);
        if (indexToRemove !== -1) {
          this.lists.splice(indexToRemove, 1);
          this.loadTasksFromSelectedList();
          this.selectedListId = '';
        }
      },
      (error) => console.error('Erro ao remover lista:', error)
    );
  }

  shareList(list: List): void {
    console.log(list);

    const dialogRef = this.dialog.open(ShareListDialog, {
      data: { list: list },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((username: string) => {
      if (username) {
        const userList: any = {
          username: username,
          listId: list.id,
        };

        this.userListService.createUserList(userList).subscribe(
          (createdUserList) => {
            this.userListService.showMessage(
              'Lista compartilhada com sucesso!'
            );
          },
          (error) =>
            this.userListService.showMessage(
              'Usuário não encontrado ou lista já compartilhada!'
            )
        );
      }

      this.loadTasksFromSelectedList();
    });
  }

  setCompleted(task: Task): void {
    if (task) {
      this.tasksService.updateTasks(task.id, task).subscribe(
        (updatedTask) => {},
        (error) => console.error('Erro ao editar tarefa:', error),
        () => {
          this.loadTasksFromSelectedList();
        }
      );
    }
  }

  selectList(listId: string): void {
    this.selectedListId = listId.toString();

    this.loadTasksFromSelectedList();
  }

  exit() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['']);
  }
}
