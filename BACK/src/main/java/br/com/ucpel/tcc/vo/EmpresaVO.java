package br.com.ucpel.tcc.vo;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaVO extends BuscaGenericaVO{

	private Long id;
	
    @NotBlank(message = "É necessário informar o nome.")
	private String nome;
    @NotBlank(message = "É necessário informar o CNPJ.")
	private String cnpj;
	
}
