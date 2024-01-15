package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.List;
import br.com.dominiosdesoftware.todo.repositories.ListRepository;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListService {

  @Autowired
  private ListRepository listRepository;

  public List save(List list) {
    return listRepository.save(list);
  }

  public java.util.List<List> findAll() {
    return listRepository.findAll();
  }

  public List findById(UUID id) {
    Optional<List> optionalListModel = listRepository.findById(id);
    return optionalListModel.orElse(null);
  }

  public java.util.List<List> findAllListsByUser(UUID userId) {
    return listRepository.findByUserId(userId);
  }

  public void delete(List list) {
    listRepository.delete(list);
  }
}