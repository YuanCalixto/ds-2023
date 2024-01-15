package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.Task;
import br.com.dominiosdesoftware.todo.repositories.TaskRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

  @Autowired
  TaskRepository taskRepository;

  public Task save(Task task) {
    return taskRepository.save(task);
  }

  public List<Task> findAll() {
    return taskRepository.findAll();
  }

  public Task findById(UUID id) {
    return taskRepository.findById(id).orElse(null);
  }

  public List<Task> findByListId(UUID listId) {
    return taskRepository.findByListId(listId);
  }


  public void delete(Task task) {
    taskRepository.delete(task);
  }
}
