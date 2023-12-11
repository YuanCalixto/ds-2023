package br.com.dominiosdesoftware.todo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "tb_tag")
@Getter
@Setter
public class TagModel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private UUID id;

  @Column(name = "name")
  private String name;
}

