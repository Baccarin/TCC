package br.com.ucpel.tcc.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioVO extends BuscaGenericaVO{

	private Long id;
	private Long idUsuario;
	private Long idEmpresa;
}
