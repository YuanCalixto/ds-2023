package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.Task;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

  List<Task> findByListId(UUID listId);
}
