package br.com.dominiosdesoftware.todo.services;

import br.com.dominiosdesoftware.todo.models.ListModel;
import br.com.dominiosdesoftware.todo.repositories.ListRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListService {

  @Autowired
  private ListRepository listRepository;

  public ListModel save(ListModel listModel) {
    return listRepository.save(listModel);
  }

  public List<ListModel> findAll() {
    return listRepository.findAll();
  }

  public ListModel findById(UUID id) {
    Optional<ListModel> optionalListModel = listRepository.findById(id);
    return optionalListModel.orElse(null);
  }

  public List<ListModel> findAllListsByUser(UUID userId) {
    return listRepository.findByUserId(userId);
  }

  public void delete(ListModel listModel) {
    listRepository.delete(listModel);
  }
}