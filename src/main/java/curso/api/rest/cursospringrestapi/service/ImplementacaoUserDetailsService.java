package curso.api.rest.cursospringrestapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import curso.api.rest.cursospringrestapi.model.Usuario;
import curso.api.rest.cursospringrestapi.repository.UsuarioRepository;

@Service
public class ImplementacaoUserDetailsService implements UserDetailsService {

  @Autowired
  private UsuarioRepository repo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Usuario usuario = repo.findUserByLogin(username);

    if ( usuario == null ) {
      throw new UsernameNotFoundException("Usuário não foi encontrado");
    }

    return new User(usuario.getLogin(), usuario.getPassword(), usuario.getAuthorities());
  }
  
}