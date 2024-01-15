package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.Tag;
import br.com.dominiosdesoftware.todo.repositories.TagRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TagService {

  @Autowired
  TagRepository tagRepository;

  public Tag save(Tag tag) {
    return tagRepository.save(tag);
  }

  public List<Tag> findAll() {
    return tagRepository.findAll();
  }

  public Tag findById(Integer id) {
    return tagRepository.findById(id).orElse(null);
  }

  public List<Tag> findByTaskId(Integer taskId) {
    return tagRepository.findByTaskId(taskId);
  }

  public void delete(Tag tag) {
    tagRepository.delete(tag);
  }
}
