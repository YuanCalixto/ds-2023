package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.TodoModel;
import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.Date;
import java.util.UUID;

public record TodoOutput(UUID id, Date dateCreated, String name, String description, Boolean completed, User creator,
                         UUID listId) {

  public TodoOutput(TodoModel todoModel) {
    this(todoModel.getId(), todoModel.getDateCreated(), todoModel.getName(),
        todoModel.getDescription(), todoModel.isCompleted(), todoModel.getUser(),
        todoModel.getList().getId());
  }
}
