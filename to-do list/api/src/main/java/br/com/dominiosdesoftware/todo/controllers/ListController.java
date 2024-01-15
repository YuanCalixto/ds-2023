package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.ListInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.ListOutput;
import br.com.dominiosdesoftware.todo.models.ListModel;
import br.com.dominiosdesoftware.todo.services.ListService;
import java.util.List;
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
    ListModel listModel = new ListModel();
    listModel.setName(listInput.name());
    listModel.setUser(listInput.user());

    ListModel savedList = listService.save(listModel);
    ListOutput listOutput = new ListOutput(savedList);

    return ResponseEntity.status(HttpStatus.CREATED).body(listOutput);
  }

  @GetMapping
  public ResponseEntity<List<ListOutput>> findAll() {
    List<ListModel> allLists = listService.findAll();
    List<ListOutput> listsOutput = allLists.stream().map(ListOutput::new).toList();
    return ResponseEntity.status(HttpStatus.OK).body(listsOutput);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ListOutput> findById(@PathVariable UUID id) {
    ListModel listModel = listService.findById(id);
    return ResponseEntity.status(HttpStatus.OK).body(new ListOutput(listModel));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<ListOutput>> getAllListsByUser(@PathVariable UUID userId) {
    List<ListModel> lists = listService.findAllListsByUser(userId);
    List<ListOutput> listsOutput = lists.stream().map(ListOutput::new).toList();
    return ResponseEntity.status(HttpStatus.OK).body(listsOutput);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ListOutput> update(@PathVariable UUID id, @RequestBody ListInput listInput) {
    ListModel listModel = listService.findById(id);
    listModel.setName(listInput.name());

    ListModel updatedList = listService.save(listModel);
    ListOutput listOutput = new ListOutput(updatedList);

    return ResponseEntity.status(HttpStatus.OK).body(listOutput);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ListOutput> delete(@PathVariable UUID id) {
    ListModel listModel = listService.findById(id);
    listService.delete(listModel);
    return ResponseEntity.status(HttpStatus.OK).body(new ListOutput(listModel));
  }
}


