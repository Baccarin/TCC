package br.com.ucpel.tcc.vo;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoVO {

	private Long idProjeto;
	private String nome;
	private List<Long> idsTimes;
	private Date dataInicio;
	private Date dataFim;
	private String etapa;
	private String metodologia;
	
}
