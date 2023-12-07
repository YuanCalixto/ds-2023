import { Component } from '@angular/core';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefasFaculdade = [
    { nome: 'Fazer trabalhos', feita: false },
    { nome: 'Estudar para prova', feita: true },
    { nome: 'Ir à biblioteca', feita: false }
  ];

  tarefasAmigos = [
    { nome: 'Ligar para o Gabriel', feita: true },
    { nome: 'Marcar encontro com o Yuan', feita: false },
    { nome: 'Visitar a Kauä', feita: false }
  ];

  ngOnInit() {}

}