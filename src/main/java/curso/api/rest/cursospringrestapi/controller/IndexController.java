package curso.api.rest.cursospringrestapi.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import curso.api.rest.cursospringrestapi.model.Usuario;
import curso.api.rest.cursospringrestapi.repository.UsuarioRepository;

@RestController
@RequestMapping(value = "/usuario")
public class IndexController {

  @Autowired
  private UsuarioRepository repo;

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Usuario> create(@RequestBody Usuario user) {

    user.setSenha(new BCryptPasswordEncoder().encode(user.getSenha()));

    return ResponseEntity.ok(repo.save(user));
  }

  @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Usuario> init(@PathVariable(value = "id") Long id) {

    Optional<Usuario> usuario = repo.findById(id);

    return new ResponseEntity<Usuario>(usuario.get(), HttpStatus.OK);
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Iterable<Usuario>> listar() {
    return ResponseEntity.ok(repo.findAll());
  }
  
  @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> deletar(@PathVariable(value = "id") Long id) {
    repo.deleteById(id);
    return new ResponseEntity<String>("{\"status\":\"200\", \"resp\":\"Usuário deletado com sucesso!\"}", HttpStatus.OK);
  }

  @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Usuario> alterarUsuario(@RequestBody Usuario user) {

    user.setSenha(new BCryptPasswordEncoder().encode(user.getSenha()));

    return new ResponseEntity<Usuario>(repo.save(user), HttpStatus.OK);
  }

}