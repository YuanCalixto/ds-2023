package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.models.UserList;
import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.Date;
import java.util.UUID;

public record UserListOutput(UUID id, Date dateCreated, Date lastUpdated, List list, User user) {

  public UserListOutput(UserList userList) {
    this(
        userList.getId(),
        userList.getDateCreated(),
        userList.getLastUpdated(),
        userList.getList(),
        userList.getUser()
    );
  }
}
