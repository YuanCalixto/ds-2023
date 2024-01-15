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
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then(mod => mod.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
