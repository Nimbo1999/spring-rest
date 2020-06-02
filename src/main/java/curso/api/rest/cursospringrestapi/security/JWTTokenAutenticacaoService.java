package curso.api.rest.cursospringrestapi.security;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import curso.api.rest.cursospringrestapi.ApplicationContextLoad;
import curso.api.rest.cursospringrestapi.model.Usuario;
import curso.api.rest.cursospringrestapi.repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
@Component
public class JWTTokenAutenticacaoService {
  
  /** Tempo de validade do meu token */
  private static final long EXPIRATION_TIME = 172800000;

  /** Secret */
  private static final String SECRET = "MeuSecret159875321";

  private static final String TOKEN_PREFIX = "Bearer";

  private static final String HEADER_STRING = "Authorization";

  public void addAuthentication(HttpServletResponse response, String username) throws Exception {

    String JWT = Jwts.builder() /** Chama o Builder do JWT. */
    .setSubject(username) /** Enviamos o usuario como subject */
    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) /** Definimos uma data de expiração */
    .signWith(SignatureAlgorithm.HS512, SECRET) /** Define um algoritimo para encriptografar e envia nosso SECRET */
    .compact();

    /** Junta o Prefixo com o JWT */
    String token = TOKEN_PREFIX + " " + JWT; /* Bearer ah87eh4t8eh48h8h48eh... */

    response.setHeader(HEADER_STRING, token);
    response.getWriter().write("{\"Authorization\": \""+ token +"\"}");

  }

  public Authentication getAuthentication(HttpServletRequest request) {
    /** Pega o token enviado no cabeçalho http */
    String token = request.getHeader(HEADER_STRING);

    if (token != null) {

      String user = Jwts.parser().setSigningKey(SECRET)
        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
        .getBody()
        .getSubject();

      if(user != null) {

        Usuario usuario = ApplicationContextLoad.getApplicationContext()
          .getBean(UsuarioRepository.class).findUserByLogin(user);

        if(usuario != null) {

          return new UsernamePasswordAuthenticationToken(
            usuario.getUsername(),
            usuario.getPassword(),
            usuario.getAuthorities()
          );

        }
      }
    }
    return null;
  }
}