package br.com.ucpel.tcc.vo;

import java.util.Calendar;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PessoaVO {

	private Long idPessoa;
	private String nome;
	private String email;
	private Calendar dataNascimento;
	private String sexo;
	
}
