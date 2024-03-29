package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<List, Integer> {

  Optional<List> findById(Integer id);

  java.util.List<List> findByUserId(UUID userId);
}
