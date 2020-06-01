package curso.api.rest.cursospringrestapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.security.core.GrantedAuthority;

@Entity
@SequenceGenerator(name = "seq_role", initialValue = 1, sequenceName = "seq_role")
public class Role implements GrantedAuthority {

  private static final long serialVersionUID = 1L;

  public Role() {
  }

  @Id
  @GeneratedValue(generator = "seq_role", strategy = GenerationType.SEQUENCE)
  private Long id;

  private String roleName;

  @Override
  public String getAuthority() { /** Retorna o nome do papel, acesso ou autorização, exemplo: ROLE_GERENTE */
    return this.roleName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getRoleName() {
    return roleName;
  }

  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }

}