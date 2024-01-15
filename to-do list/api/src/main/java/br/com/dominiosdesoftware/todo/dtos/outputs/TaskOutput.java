package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.Task;
import java.util.Date;
import java.util.UUID;

public record TaskOutput(Integer id, Date dateCreated, String name, String description, Boolean completed,
                         UserOutput user) {

  public TaskOutput(Task task) {
    this(task.getId(), task.getDateCreated(), task.getName(),
        task.getDescription(), task.isCompleted(), new UserOutput(task.getUser()));
  }
}
