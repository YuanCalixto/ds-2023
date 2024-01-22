package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.user.User;
import br.com.dominiosdesoftware.todo.repositories.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public User save(User user) {
    return userRepository.save(user);
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(UUID id) {
    Optional<User> optionalUser = userRepository.findById(id);
    return optionalUser.orElse(null);
  }

  public User findByLogin(String login) {
    return userRepository.findCustomByLogin(login);
  }

  public User findByLoginAndPass(String login, String pass) {
    return userRepository.findByLoginAndPassword(login, pass);
  }

}