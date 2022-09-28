package br.com.ucpel.tcc.vo;

import java.util.Calendar;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioVO extends BuscaGenericaVO{

	private Long idUsuario;
	private Long idFuncionario;
	private String login;
	private String senha;
	private Calendar dataCadastro;
	
	public UsuarioVO(String login, String senha) {
		this.login = login;
		this.senha = senha;
	}
}
