package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.AuthenticationDTO;
import br.com.dominiosdesoftware.todo.dtos.LoginResponseDTO;
import br.com.dominiosdesoftware.todo.dtos.RegisterDTO;
import br.com.dominiosdesoftware.todo.infra.security.TokenService;
import br.com.dominiosdesoftware.todo.models.user.User;
import br.com.dominiosdesoftware.todo.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

  @Autowired
  private final AuthenticationManager authenticationManager;
  @Autowired
  private final UserRepository userRepository;
  @Autowired
  private final TokenService tokenService;

  public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository,
      TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  @PostMapping("/login")
  public ResponseEntity login(@RequestBody AuthenticationDTO data) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
    var auth = this.authenticationManager.authenticate(usernamePassword);

    var token = tokenService.generateToken((User) auth.getPrincipal());

    return ResponseEntity.ok(new LoginResponseDTO(token));
  }

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody @Valid RegisterDTO data) {
    if (this.userRepository.findByLogin(data.login()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
    User newUser = new User(data.login(), encryptedPassword);
    this.userRepository.save(newUser);
    return ResponseEntity.ok().build();
  }
}
