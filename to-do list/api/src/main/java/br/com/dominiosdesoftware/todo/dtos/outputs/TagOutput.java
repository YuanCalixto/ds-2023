package br.com.dominiosdesoftware.todo.dtos.outputs;

import br.com.dominiosdesoftware.todo.models.Tag;
import java.util.UUID;

public record TagOutput(Integer id, String name) {

  public TagOutput(Tag tag) {
    this(tag.getId(), tag.getName());
  }
}
