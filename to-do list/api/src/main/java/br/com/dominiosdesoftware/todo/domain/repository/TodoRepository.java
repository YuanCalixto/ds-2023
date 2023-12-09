package br.com.dominiosdesoftware.todo.domain.repository;

import br.com.dominiosdesoftware.todo.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

    @Query(value = "SELECT * FROM TODO", nativeQuery = true)
    List<Todo> findAll();
}
