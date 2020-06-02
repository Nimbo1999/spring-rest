package curso.api.rest.cursospringrestapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import curso.api.rest.cursospringrestapi.service.ImplementacaoUserDetailsService;

/** Mapeia URL, autoriza ou bloqueia acessos a URL */
@Configuration
@EnableWebSecurity
public class WebConfigSecurity extends WebSecurityConfigurerAdapter {
 
  @Autowired
  private ImplementacaoUserDetailsService service;

  /** Configura as solicitações de acesso por http */
  @Override
  protected void configure(HttpSecurity http) throws Exception {

    /** Ativando a proteção contra usuários que não estão validados por token */
    http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
    /** Ativando as restrições a URL */
    .disable().authorizeRequests().antMatchers("/").permitAll()
    /** URL de Logout - Redireciona após o user deslogar do sistema */
    .anyRequest().authenticated().and().logout().logoutUrl("/logout")
    /** Filtra requisições de login para autenticação */
    .and().addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
    /** Filtra demais requisições para verificar a presença do JWT no header HTTP */
    .addFilterBefore(new JwtApiAutenticacaoFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(service)
    .passwordEncoder(new BCryptPasswordEncoder());
  }
}