package br.com.dominiosdesoftware.todo.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "password")
  private String password;

  @Column(name = "amigos")
  private List<User> amigos;

  @Column(name = "last_updated")
  @UpdateTimestamp
  private Date lastUpdated;
}
