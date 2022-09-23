package br.com.ucpel.tcc.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaVO {

	private Long id;
	private String nome;
	private String cnpj;
	
}
