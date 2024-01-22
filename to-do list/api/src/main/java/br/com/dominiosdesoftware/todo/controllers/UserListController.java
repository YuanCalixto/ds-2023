package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.UserListInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.UserListOutput;
import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.models.UserList;
import br.com.dominiosdesoftware.todo.models.user.User;
import br.com.dominiosdesoftware.todo.services.ListService;
import br.com.dominiosdesoftware.todo.services.UserListService;
import br.com.dominiosdesoftware.todo.services.UserService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userLists")
@CrossOrigin(origins = "http://localhost:4200")
public class UserListController {

  private final ListService listService;
  private final UserService userService;
  private final UserListService userListService;

  @Autowired
  public UserListController(ListService listService, UserService userService, UserListService userListService) {
    this.listService = listService;
    this.userService = userService;
    this.userListService = userListService;
  }

  @GetMapping("/all")
  public java.util.List<UserList> getAll() {
    return userListService.findAll();
  }

  @PostMapping("/user/{userId}")
  public ResponseEntity<java.util.List<UserListOutput>> getById(@PathVariable UUID userId) {
    User user = userService.findById(userId);

    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    java.util.List<UserList> userList = userListService.findByUserId(user.getId());

    if (userList.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    var userLists = userList.stream().map(UserListOutput::new).toList();

    return ResponseEntity.status(HttpStatus.OK).body(userLists);
  }


  @PostMapping
  public ResponseEntity<UserListOutput> createUserList(@RequestBody UserListInput userListInput) {

    User user = userService.findByLogin(userListInput.username());
    List list = listService.findById(userListInput.listId());

    if (user == null) {
      throw new Error("Usuário não encontrado!");
    }

    java.util.List<UserList> userListRegistered = userListService.findByListId(list.getId());

    if (!userListRegistered.isEmpty()) {
      throw new Error("Lista já compartilhada!");
    }

    UserList userList = UserList.builder()
        .user(user)
        .list(list)
        .build();

    UserList userListSaved = userListService.save(userList);

    return ResponseEntity.status(HttpStatus.CREATED).body(new UserListOutput(userListSaved));
  }

  @DeleteMapping("/{userListId}")
  public ResponseEntity<Void> deleteUserList(@PathVariable UUID userListId) {
    UserList userList = userListService.findById(userListId);

    if (userList == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    userListService.delete(userList);

    return ResponseEntity.status(HttpStatus.OK).build();
  }


}
