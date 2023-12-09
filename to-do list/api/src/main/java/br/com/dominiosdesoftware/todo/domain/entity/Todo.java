package br.com.dominiosdesoftware.todo.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "todo")
@Getter
@Setter
public class Todo extends BaseEntity {

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "completed")
  private boolean completed;

  @Column(name = "last_updated")
  @UpdateTimestamp
  private Date lastUpdated;
}
