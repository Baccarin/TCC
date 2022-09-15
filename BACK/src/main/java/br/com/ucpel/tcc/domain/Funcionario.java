package br.com.ucpel.tcc.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@Entity
@Table(name = "funcionario", schema = "engenhariasoftware", uniqueConstraints = {})
@NoArgsConstructor
public class Funcionario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne
    @JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@ManyToOne	
	@JoinColumn(name="id_empresa")
	private Empresa empresa;
	
	public Funcionario (Usuario usuario) {
		this.usuario = usuario;
	}
	
}
