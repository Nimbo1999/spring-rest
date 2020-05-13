package curso.api.rest.cursospringrestapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import curso.api.rest.cursospringrestapi.model.Telefone;

@Repository
public interface TelefoneRepository extends CrudRepository<Telefone, Long> {

}