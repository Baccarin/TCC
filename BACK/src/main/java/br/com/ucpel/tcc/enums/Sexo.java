package br.com.ucpel.tcc.enums;

import java.util.Arrays;
import java.util.List;

public enum Sexo {

	MASCULINO("Masculino"), FEMININO("Feminino"), OUTRO("Outro"), NAO_INFORMADO("Não informado");

	private String descricao;

	Sexo(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
	
	public static List<Sexo> getListaSexos(){
		return Arrays.asList(Sexo.values());
	}

}
