package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.Task;
import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.Date;
import java.util.UUID;

public record TaskOutput(UUID id, Date dateCreated, String name, String description, Boolean completed, User creator) {

  public TaskOutput(Task task) {
    this(task.getId(), task.getDateCreated(), task.getName(),
        task.getDescription(), task.isCompleted(), task.getUser());
  }
}
