package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.UUID;

public record UserOutput(UUID id, String login) {

  public UserOutput(User user) {
    this(user.getId(),  user.getLogin());
  }
}
