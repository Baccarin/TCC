package br.com.ucpel.tcc.vo;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoVO extends BuscaGenericaVO{

	private Long idProjeto;
	private String nome;
	private Long idTime;
	private String dataInicio;
	private String dataFim;
	private String etapa;
	private String metodologia;
	private boolean ativo;
	
	private HashMap<String, Integer> respostas;
	
}
