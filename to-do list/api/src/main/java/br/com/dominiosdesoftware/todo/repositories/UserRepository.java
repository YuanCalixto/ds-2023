package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, UUID> {

  UserDetails findByLogin(String login);

  @Query("SELECT u FROM User u WHERE u.login LIKE :login")
  User findCustomByLogin(@Param("login") String login);

  User findByLoginAndPassword(String login, String pass);
}
