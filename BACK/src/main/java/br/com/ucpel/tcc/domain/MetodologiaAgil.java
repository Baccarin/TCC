package br.com.ucpel.tcc.domain;

public enum MetodologiaAgil {

	XP("XP"),
	SCRUM("Scrum"),
	CRYSTAL("Crystal"), 
	KANBAN("Kanban");

	private String descricao;

	MetodologiaAgil(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
}
