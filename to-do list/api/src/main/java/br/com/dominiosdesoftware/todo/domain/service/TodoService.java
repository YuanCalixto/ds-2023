package br.com.dominiosdesoftware.todo.domain.service;

import br.com.dominiosdesoftware.todo.domain.entity.Todo;
import br.com.dominiosdesoftware.todo.domain.repository.TodoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

  private final TodoRepository todoRepository;

  public TodoService(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

  public List<Todo> getAllTodos() {
    return todoRepository.findAll();
  }

  public Optional<Todo> getTodoById(int id) {
    return todoRepository.findById(id);
  }

  public Todo createTodo(Todo todo) {
    return todoRepository.save(todo);
  }

  public Todo updateTodo(Todo todo) throws Exception {
    if (todo.getId() <= 0 || !todoRepository.existsById(todo.getId())) {
      throw new Exception("Tarefa inválida!");
    }
    return todoRepository.save(todo);
  }


  public void deleteTodoById(int id) throws Exception {
    if (!todoRepository.existsById(id)) {
      throw new Exception("Tarefa não encontrada!");
    }
    todoRepository.deleteById(id);
  }
}
