package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.UserList;
import br.com.dominiosdesoftware.todo.repositories.UserListRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserListService {

  @Autowired
  private UserListRepository userListRepository;

  public UserList save(UserList userList) {
    return userListRepository.save(userList);
  }

  public void delete(UserList userList) {
    userListRepository.delete(userList);
  }

  public List<UserList> findAll() {
    return userListRepository.findAll();
  }

  public UserList findById(UUID id) {
    return userListRepository.findById(id);
  }

  public List<UserList> findByUserId(UUID userId) {
    return userListRepository.findByUserId(userId);
  }

  public List<UserList> findByListId(Integer taskId) {
    return userListRepository.findByListId(taskId);
  }

}
