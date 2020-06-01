package curso.api.rest.cursospringrestapi.model;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
public class Usuario implements UserDetails {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String login;

  private String senha;

  private String nome;

  @JsonManagedReference
  @OneToMany(mappedBy = "usuario", orphanRemoval = true, cascade = CascadeType.ALL)
  private List<Telefone> telefones;

  @OneToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "usuarios_role",
    uniqueConstraints = @UniqueConstraint(
      columnNames = {"usuario_id", "role_id"},
      name = "unique_user_role"
    ),
    joinColumns = @JoinColumn(
      table = "usuario",
      name = "usuario_id",
      referencedColumnName = "id",
      foreignKey = @ForeignKey(
        name = "usuario_fk",
        value = ConstraintMode.CONSTRAINT
      ),
      unique = false
    ),
    inverseJoinColumns = @JoinColumn(
      table = "role",
      name = "role_id",
      referencedColumnName = "id",
      foreignKey = @ForeignKey(
        value = ConstraintMode.CONSTRAINT,
        name = "role_fk"
      ),
      unique = false
    )
  )
  private List<Role> roles;

  public Usuario() {
  }

  public Usuario(Long id) {
    this.id = id;
  }

  public Usuario(Long id, String login, String senha, String nome) {
    this.id = id;
    this.login = login;
    this.senha = senha;
    this.nome = nome;
  }

  public Usuario(Long id, String login, String senha, String nome, List<Telefone> telefones) {
    this.id = id;
    this.login = login;
    this.senha = senha;
    this.nome = nome;
    this.telefones = telefones;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getLogin() {
    return login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public List<Telefone> getTelefones() {
    return telefones;
  }

  public void setTelefones(List<Telefone> telefones) {
    this.telefones = telefones;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Usuario other = (Usuario) obj;
    if (id == null) {
      if (other.id != null)
        return false;
    } else if (!id.equals(other.id))
      return false;
    return true;
  }

  // São os acessos do usuário
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles;
  }

  @Override
  public String getPassword() {
    return this.senha;
  }

  @Override
  public String getUsername() {
    return this.login;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  

}