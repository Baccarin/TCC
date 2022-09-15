package br.com.ucpel.tcc.enums;

public enum Sexo {

	MASCULINO("Masculino"), FEMININO("Feminino"), OUTRO("Outro"), NAO_INFORMADO("Não informado");

	private String descricao;

	Sexo(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

}
