package curso.api.rest.cursospringrestapi.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import curso.api.rest.cursospringrestapi.model.Usuario;

/** Estabelece o nosso gerenciador de Token */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

  /** Configurando o gerenciador de autenticação */
  protected JWTLoginFilter(String url, AuthenticationManager authenticationManager) {
    /** Obriga a autenticar a URL */
    super(new AntPathRequestMatcher(url));

    /** Gerenciador de autenticação */
    setAuthenticationManager(authenticationManager);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
  throws AuthenticationException, IOException, ServletException {

    /** Pega o usuário do nosso token */
    Usuario user = new ObjectMapper()
      .readValue(request.getInputStream(), Usuario.class);

      response.addHeader("Access-Control-Allow-Origin", "*");
      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
      response.getWriter().write("{\"message\": \"Usuário não foi encontrado\"}");

    return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
  Authentication authResult) throws IOException, ServletException {

    try {
      new JWTTokenAutenticacaoService().addAuthentication(response, authResult.getName());
    } catch (Exception e) {
      System.err.println("Mensagem: " + e.getMessage() + " StackTrace: " + e.getStackTrace());
    }

  }
  
}