package br.com.dominiosdesoftware.todo.controllers;

import br.com.dominiosdesoftware.todo.dtos.inputs.TagInput;
import br.com.dominiosdesoftware.todo.dtos.outputs.TagOutput;
import br.com.dominiosdesoftware.todo.models.Tag;
import br.com.dominiosdesoftware.todo.models.Task;
import br.com.dominiosdesoftware.todo.services.TagService;
import br.com.dominiosdesoftware.todo.services.TaskService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tags")
@CrossOrigin(origins = "http://localhost:4200")
public class TagController {

  private final TaskService taskService;
  private final TagService tagService;

  @Autowired
  public TagController(TaskService taskService, TagService tagService) {
    this.taskService = taskService;
    this.tagService = tagService;
  }


  @PostMapping
  public ResponseEntity<TagOutput> save(@RequestBody TagInput tagInput) {
    Task task = taskService.findById(tagInput.taskId());
    Tag tag = new Tag();
    tag.setName(tagInput.name());
    tag.setTask(task);
    Tag savedTag = tagService.save(tag);
    TagOutput tagOutput = new TagOutput(savedTag);
    return ResponseEntity.status(HttpStatus.CREATED).body(tagOutput);
  }

  @GetMapping
  public ResponseEntity<List<Tag>> findAll() {
    List<Tag> allTags = tagService.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(allTags);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TagOutput> findById(@PathVariable Integer id) {
    Tag tag = tagService.findById(id);
    TagOutput tagOutput = new TagOutput(tag);
    return ResponseEntity.status(HttpStatus.OK).body(tagOutput);
  }

  @GetMapping("/task/{listId}")
  public ResponseEntity<List<TagOutput>> findByTaskId(@PathVariable Integer taskId) {
    List<Tag> tags = tagService.findByTaskId(taskId);
    List<TagOutput> tagOutputs = tags.stream().map(TagOutput::new).toList();
    return ResponseEntity.status(HttpStatus.OK).body(tagOutputs);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<TagOutput> delete(@PathVariable Integer id) {
    Tag tag = tagService.findById(id);
    tagService.delete(tag);
    TagOutput tagOutput = new TagOutput(tag);
    return ResponseEntity.status(HttpStatus.OK).body(tagOutput);
  }
}
