package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.TodoModel;
import br.com.dominiosdesoftware.todo.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public Optional<TodoModel> findById(UUID id) {
        return todoRepository.findById(id);
    }

    public void delete(TodoModel todoModel) {
        todoRepository.delete(todoModel);
    }
}
