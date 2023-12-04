package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
