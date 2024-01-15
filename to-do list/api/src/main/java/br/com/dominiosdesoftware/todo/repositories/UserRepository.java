package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.user.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, UUID> {

  UserDetails findByLogin(String login);

  User findByLoginAndPassword(String login, String pass);
}
