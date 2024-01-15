package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.TodoModel;
import br.com.dominiosdesoftware.todo.repositories.TodoRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

  @Autowired
  TodoRepository todoRepository;

  public TodoModel save(TodoModel todoModel) {
    return todoRepository.save(todoModel);
  }

  public List<TodoModel> findAll() {
    return todoRepository.findAll();
  }

  public TodoModel findById(UUID id) {
    return todoRepository.findById(id).orElse(null);
  }


  public void delete(TodoModel todoModel) {
    todoRepository.delete(todoModel);
  }
}
