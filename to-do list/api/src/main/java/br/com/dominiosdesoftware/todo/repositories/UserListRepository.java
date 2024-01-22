package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.UserList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserListRepository extends JpaRepository<UserList, Integer> {

  List<UserList> findByUserId(UUID userId);

  List<UserList> findByListId(Integer taskId);

}
