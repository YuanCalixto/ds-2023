package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.ListInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.ListOutput;
import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.services.ListService;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "http://localhost:4200")
public class ListController {

  private final ListService listService;

  @Autowired
  public ListController(ListService listService) {
    this.listService = listService;
  }

  @PostMapping
  public ResponseEntity<ListOutput> save(@RequestBody ListInput listInput) {
    List list = new List();
    list.setName(listInput.name());
    list.setUser(listInput.user());

    List savedList = listService.save(list);
    ListOutput listOutput = new ListOutput(savedList);

    return ResponseEntity.status(HttpStatus.CREATED).body(listOutput);
  }

  @GetMapping
  public ResponseEntity<java.util.List<ListOutput>> findAll() {
    java.util.List<List> allLists = listService.findAll();
    java.util.List<ListOutput> listsOutput = allLists.stream().map(ListOutput::new).toList();
    return ResponseEntity.status(HttpStatus.OK).body(listsOutput);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ListOutput> findById(@PathVariable Integer id) {
    List list = listService.findById(id);
    return ResponseEntity.status(HttpStatus.OK).body(new ListOutput(list));
  }

  @PostMapping("/user/{userId}")
  public java.util.List<ListOutput> getAllListsByUser(@PathVariable UUID userId) {
    java.util.List<List> lists = listService.findAllListsByUser(userId);
    java.util.List<ListOutput> listsOutput = lists.stream().map(ListOutput::new).toList();
    return (listsOutput);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ListOutput> update(@PathVariable Integer id, @RequestBody ListInput listInput) {
    List list = listService.findById(id);
    list.setName(listInput.name());

    List updatedList = listService.save(list);
    ListOutput listOutput = new ListOutput(updatedList);

    return ResponseEntity.status(HttpStatus.OK).body(listOutput);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ListOutput> delete(@PathVariable Integer id) {
    List list = listService.findById(id);
    listService.delete(list);
    return ResponseEntity.status(HttpStatus.OK).body(new ListOutput(list));
  }
}


