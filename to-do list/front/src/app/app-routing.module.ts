import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./screens/tarefas/tasks.module').then(mod => mod.TasksModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
