package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.models.user.User;

public record ListOutput(String id, String name, User user) {

  public ListOutput(List list) {
    this(list.getId().toString(), list.getName(), list.getUser());
  }
}
