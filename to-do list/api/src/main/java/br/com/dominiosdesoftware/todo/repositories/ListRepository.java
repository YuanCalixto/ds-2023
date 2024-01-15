package br.com.dominiosdesoftware.todo.repositories;

import br.com.dominiosdesoftware.todo.models.ListModel;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<ListModel, UUID> {

  Optional<ListModel> findById(UUID id);

  List<ListModel> findByUserId(UUID userId);


}
