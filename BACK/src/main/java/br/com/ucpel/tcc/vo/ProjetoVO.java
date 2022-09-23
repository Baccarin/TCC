package br.com.ucpel.tcc.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoVO {

	private Long idProjeto;
	private String nome;
	private Long idTime;
	private String dataInicio;
	private String dataFim;
	private String etapa;
	private String metodologia;
	private boolean ativo;
	
}
