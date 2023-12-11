package br.com.dominiosdesoftware.todo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "tb_tag_user")
@Getter
@Setter
public class TagUserModel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserModel user;

  @ManyToOne
  @JoinColumn(name = "tag_id")
  private TagModel tag;
}


