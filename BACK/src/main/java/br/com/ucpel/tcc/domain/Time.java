package br.com.ucpel.tcc.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
@Entity
@Table(name = "time", schema = "engenhariasoftware", uniqueConstraints = {})
public class Time {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "nome", columnDefinition = "TEXT" , nullable = false, updatable = true)
	private String nome;
	
	@OneToMany
    @JoinColumn(name = "id_time") 
	private List<Funcionario> funcionarios;
	
	@ManyToOne
	@JoinColumn(name = "id_lider", nullable = true, updatable = true)
	private Funcionario lider;
	
	public Time() {
		this.funcionarios = new ArrayList<Funcionario>();
	}
	
}
