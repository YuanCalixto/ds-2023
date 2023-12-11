package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.TodoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TodoRepository extends JpaRepository<TodoModel, UUID> {
}
