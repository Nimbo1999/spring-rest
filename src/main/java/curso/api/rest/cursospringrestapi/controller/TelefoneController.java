package curso.api.rest.cursospringrestapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import curso.api.rest.cursospringrestapi.model.Telefone;
import curso.api.rest.cursospringrestapi.repository.TelefoneRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping(value = "/telefone")
public class TelefoneController {

  @Autowired
  private TelefoneRepository repo;

  @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Telefone> create(@RequestBody Telefone telefone){
    return ResponseEntity.ok(repo.save(telefone));
  }

  @GetMapping(value="/", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Iterable<Telefone>> getMethodName() {
      return ResponseEntity.ok(repo.findAll());
  }

  @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Telefone> buscarTelefone(@PathVariable(value = "id") Long id) {
    Optional<Telefone> telefone = repo.findById(id);
    return ResponseEntity.ok(telefone.get());
  }
  
  

}