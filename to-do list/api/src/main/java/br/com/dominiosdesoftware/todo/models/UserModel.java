package br.com.dominiosdesoftware.todo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_user")
@Getter
@Setter
public class UserModel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private UUID id;

  @Column(name = "name")
  private String name;

  @Column(name = "password")
  private String password;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<TagUserModel> tags;

  @Column(name = "last_updated")
  @UpdateTimestamp
  private Date lastUpdated;
}

