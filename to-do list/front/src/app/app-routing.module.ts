import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateCarbonoModule } from './screens/template-carbono/template-carbono.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/tarefas/tarefas.module').then(mod => mod.TarefasModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }