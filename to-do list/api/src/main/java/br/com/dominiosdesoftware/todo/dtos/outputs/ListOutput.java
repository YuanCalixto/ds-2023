package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.ListModel;
import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.Date;
import java.util.UUID;

public record ListOutput(String id, String name, User user) {

  public ListOutput(ListModel listModel) {
    this(listModel.getId().toString(), listModel.getName(), listModel.getUser());
  }
}
