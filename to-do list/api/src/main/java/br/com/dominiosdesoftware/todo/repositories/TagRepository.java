package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.Tag;
import br.com.dominiosdesoftware.todo.models.Task;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

  List<Tag> findByTaskId(Integer listId);
}
