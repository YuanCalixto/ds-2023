package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.UserInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.UserOutput;
import br.com.dominiosdesoftware.todo.models.user.User;
import br.com.dominiosdesoftware.todo.services.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/all")
  public List<User> getAll() {
    return userService.findAll();
  }

  @PostMapping("/login")
  public ResponseEntity<UserOutput> loginUser(@RequestBody UserInput userInput) {
    User user = userService.findByLoginAndPass(userInput.login(), userInput.password());

    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    return ResponseEntity.status(HttpStatus.OK).body(new UserOutput(user));
  }

  @PostMapping("/register")
  public ResponseEntity<UserOutput> registerUser(@RequestBody UserInput userInput) {

    var user = new User(userInput.login(), userInput.password());

    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    var userSaved = userService.save(user);

    return ResponseEntity.status(HttpStatus.OK).body(new UserOutput(userSaved));
  }

}

