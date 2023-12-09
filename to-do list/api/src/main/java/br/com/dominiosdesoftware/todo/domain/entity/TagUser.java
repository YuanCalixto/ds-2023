package br.com.dominiosdesoftware.todo.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tag_user")
@Getter
@Setter
public class TagUser extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "tarefa_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "tag_id")
  private Tag tag;
}
