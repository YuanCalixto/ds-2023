package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.TodoInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.TodoOutput;
import br.com.dominiosdesoftware.todo.models.ListModel;
import br.com.dominiosdesoftware.todo.models.TodoModel;
import br.com.dominiosdesoftware.todo.services.ListService;
import br.com.dominiosdesoftware.todo.services.TodoService;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

  private final ListService listService;
  private final TodoService todoService;

  @Autowired
  public TodoController(ListService listService, TodoService todoService) {
    this.listService = listService;
    this.todoService = todoService;
  }

  @PostMapping
  public ResponseEntity<TodoOutput> save(@RequestBody TodoInput todoInput) {
    ListModel list = listService.findById(todoInput.listId());

    TodoModel todoModel = new TodoModel();
    todoModel.setName(todoInput.name());
    todoModel.setDescription(todoInput.description());
    todoModel.setUser(todoInput.creator());
    todoModel.setList(list);

    TodoModel savedTodo = todoService.save(todoModel);
    TodoOutput todoOutput = new TodoOutput(savedTodo);

    return ResponseEntity.status(HttpStatus.CREATED).body(todoOutput);
  }

  @GetMapping
  public ResponseEntity<List<TodoModel>> findAll() {
    List<TodoModel> allTodos = todoService.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(allTodos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TodoOutput> findById(@PathVariable UUID id) {
    TodoModel todoModel = todoService.findById(id);
    TodoOutput todoOutput = new TodoOutput(todoModel);
    return ResponseEntity.status(HttpStatus.OK).body(todoOutput);
  }

  @PutMapping("/{id}")
  public ResponseEntity<TodoOutput> update(@PathVariable UUID id, @RequestBody TodoInput todoInput) {
    TodoModel todoModel = todoService.findById(id);

    todoModel.setName(todoInput.name());
    todoModel.setDescription(todoInput.description());
    todoModel.setCompleted(todoInput.completed());

    TodoModel updatedTodo = todoService.save(todoModel);
    TodoOutput todoOutput = new TodoOutput(updatedTodo);

    return ResponseEntity.status(HttpStatus.OK).body(todoOutput);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<TodoOutput> delete(@PathVariable UUID id) {
    TodoModel todoModel = todoService.findById(id);
    todoService.delete(todoModel);
    TodoOutput todoOutput = new TodoOutput(todoModel);

    return ResponseEntity.status(HttpStatus.OK).body(todoOutput);
  }
}

