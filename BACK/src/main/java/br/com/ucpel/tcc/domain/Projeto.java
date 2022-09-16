package br.com.ucpel.tcc.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.com.ucpel.tcc.enums.EtapaProjeto;
import br.com.ucpel.tcc.enums.MetodologiaAgil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@Entity
@NoArgsConstructor
@Table(name = "projeto", schema = "engenhariasoftware", uniqueConstraints = {})
public class Projeto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "nome", columnDefinition = "TEXT", nullable = false, updatable = true)
	private String nome;

	@OneToMany(mappedBy = "id")
	private List<Time> times;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "dataInicio", nullable = false, updatable = true)
	private Date dataInicio;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "dataFim", nullable = true, updatable = true)
	private Date dataFim;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "etapa", nullable = false, updatable = true)
	private EtapaProjeto etapa;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "metodologia_aplicada", nullable = true, updatable = true)
	private MetodologiaAgil metodologiaAplicada;
	
	@Column(name = "ativo",columnDefinition = "boolean default true", nullable = true, updatable = true)	
	private Boolean ativo;
	
	
}
