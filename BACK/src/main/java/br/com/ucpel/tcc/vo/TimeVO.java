package br.com.ucpel.tcc.vo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeVO extends BuscaGenericaVO {

	private Long idTime;
	private String nome;
	private Long idLider;
	private List<Long> idFuncionarios;
}
