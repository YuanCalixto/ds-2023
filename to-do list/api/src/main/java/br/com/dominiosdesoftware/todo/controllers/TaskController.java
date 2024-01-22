package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.TaskInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.TaskOutput;
import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.models.Tag;
import br.com.dominiosdesoftware.todo.models.Task;
import br.com.dominiosdesoftware.todo.services.ListService;
import br.com.dominiosdesoftware.todo.services.TagService;
import br.com.dominiosdesoftware.todo.services.TaskService;
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
public class TaskController {

  private final ListService listService;
  private final TagService tagService;
  private final TaskService taskService;

  @Autowired
  public TaskController(ListService listService, TagService tagService, TaskService taskService) {
    this.listService = listService;
    this.tagService = tagService;
    this.taskService = taskService;
  }

  @GetMapping
  public ResponseEntity<java.util.List<Task>> findAll() {
    java.util.List<Task> allTodos = taskService.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(allTodos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskOutput> findById(@PathVariable Integer id) {
    Task task = taskService.findById(id);
    TaskOutput taskOutput = new TaskOutput(task);
    return ResponseEntity.status(HttpStatus.OK).body(taskOutput);
  }

  @GetMapping("/list/{listId}")
  public ResponseEntity<java.util.List<TaskOutput>> findByListId(@PathVariable Integer listId) {

    java.util.List<Task> tasks = taskService.findByListId(listId);

    var taskOutput = tasks.stream().map(TaskOutput::new).toList();

    return ResponseEntity.status(HttpStatus.OK).body(taskOutput);
  }

  @PostMapping
  public ResponseEntity<TaskOutput> save(@RequestBody TaskInput taskInput) {
    List list = listService.findById(taskInput.listId());

    Task task = new Task();
    task.setName(taskInput.name());
    task.setDescription(taskInput.description());
    task.setUser(taskInput.user());
    task.setList(list);

    Task savedTask = taskService.save(task);

    TaskOutput taskOutput = new TaskOutput(savedTask);

    return ResponseEntity.status(HttpStatus.CREATED).body(taskOutput);
  }

  @PutMapping("/{id}")
  public ResponseEntity<TaskOutput> update(@PathVariable Integer id, @RequestBody TaskInput taskInput) {
    Task task = taskService.findById(id);

    task.setName(taskInput.name());
    task.setDescription(taskInput.description());
    task.setCompleted(taskInput.completed());
    Task updatedTodo = taskService.save(task);

    TaskOutput taskOutput = new TaskOutput(updatedTodo);

    return ResponseEntity.status(HttpStatus.OK).body(taskOutput);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<TaskOutput> delete(@PathVariable Integer id) {
    Task task = taskService.findById(id);

    java.util.List<Tag> tags = tagService.findByTaskId(task.getId());
    for (Tag tag : tags) {
      tagService.delete(tag);
    }

    taskService.delete(task);
    TaskOutput taskOutput = new TaskOutput(task);

    return ResponseEntity.status(HttpStatus.OK).body(taskOutput);
  }
}

