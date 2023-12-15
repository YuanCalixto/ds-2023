package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.TodoDto;
import br.com.dominiosdesoftware.todo.models.TodoModel;
import br.com.dominiosdesoftware.todo.services.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    @Autowired
    TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoModel> save(@RequestBody @Valid TodoDto todoDto) {
        var todoModel = new TodoModel();
        BeanUtils.copyProperties(todoDto, todoModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.save(todoModel));
    }

    @GetMapping
    public ResponseEntity<List<TodoModel>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(todoService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getOne(@PathVariable(value = "id") UUID id) {
        Optional<TodoModel> todoModelOptional = todoService.findById(id);
        if(todoModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(todoModelOptional.get());
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") UUID id,
                                         @RequestBody @Valid TodoDto todoDto) {
        Optional<TodoModel> todoModelOptional = todoService.findById(id);
        if(todoModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found.");
        }
        var todoModel = todoModelOptional.get();
        BeanUtils.copyProperties(todoDto, todoModel);
        return ResponseEntity.status(HttpStatus.OK).body(todoService.save(todoModel));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") UUID id) {
        Optional<TodoModel> todoModelOptional = todoService.findById(id);
        if(todoModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found.");
        }
        todoService.delete(todoModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Todo deleted successfully!");
    }
}
