package br.com.ucpel.tcc.domain;

import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.ucpel.tcc.enums.Sexo;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@Entity
@NoArgsConstructor
@Table(name = "pessoa", schema = "engenhariasoftware", uniqueConstraints = {})
public class Pessoa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "nome", columnDefinition = "TEXT", nullable = false, updatable = true)
	private String nome;
	
	@Column(name = "email", columnDefinition = "TEXT", nullable = false, updatable = true)
	private String email;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "sexo", nullable = false, updatable = true)
	private Sexo sexo;	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_nascimento", nullable = true, updatable = true)
	private Calendar dataNascimento;
	
	public Pessoa(String nome, String email, String sexo) {
		this.nome = nome;
		this.email = email;
		this.sexo = Sexo.valueOf(sexo);
	}
	
	public Pessoa(String nome, String email, String sexo, Calendar dataNascimento) {
		this(nome, email, sexo);
		this.dataNascimento = dataNascimento;
	}
	
}
