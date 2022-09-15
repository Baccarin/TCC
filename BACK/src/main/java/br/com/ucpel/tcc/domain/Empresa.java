package br.com.ucpel.tcc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Entity
@Table(uniqueConstraints = 
  {@UniqueConstraint(name = "empresa_nome_cnpj_unique", columnNames = { "nome", "cnpj" })})
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", nullable = false, updatable = true)
	private String nome;
	
	@Column(name = "cnpj", nullable = false, updatable = true)
	private String cnpj;
	
}
