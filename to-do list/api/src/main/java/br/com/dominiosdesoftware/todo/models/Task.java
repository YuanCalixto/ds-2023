package br.com.dominiosdesoftware.todo.models;

import br.com.dominiosdesoftware.todo.models.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "tb_todo")
@Getter
@Setter
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Integer id;

  @Column(name = "name")
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "completed")
  private boolean completed;

  @Column(name = "date_created", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  @CreationTimestamp
  private Date dateCreated;

  @Column(name = "last_updated", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  @UpdateTimestamp
  private Date lastUpdated;

  @ManyToOne
  @JoinColumn(name = "list_id")
  @JsonIgnore
  private List list;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;
}