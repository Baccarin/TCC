package br.com.ucpel.tcc.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@Entity
@Table(name = "usuario", schema = "engenhariasoftware", uniqueConstraints = {})
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@OneToOne
	@JoinColumn(name = "id_pessoa", nullable = true, updatable = false)
	private Pessoa pessoa;

	@Column(name = "login", columnDefinition = "TEXT", nullable = false, updatable = false, unique = true)
	private String login;

	@Column(name = "senha", columnDefinition = "TEXT", nullable = false, updatable = true)
	private String senha;

	@Column(name = "ativo", columnDefinition = "boolean default true", nullable = false, updatable = true)
	private Boolean ativo;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_cadastro", nullable = false, updatable = false)
	private Calendar dataCadastro;
	
	public Usuario() {
		this.dataCadastro = Calendar.getInstance();
		this.ativo = true;
	}
	
	public Usuario (Pessoa pessoa, String login, String senha, Calendar dataCadastro) {
		this.pessoa = pessoa;
		this.login = login;
		this.senha = senha;
		this.dataCadastro = dataCadastro;
		this.ativo = true;
	}
	
	
}
