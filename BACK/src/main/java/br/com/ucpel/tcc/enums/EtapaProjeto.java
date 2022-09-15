package br.com.ucpel.tcc.enums;

public enum EtapaProjeto {

	INICIO("Estado inicial",1),
	REQUISITOS("Em obtenção de requisitos", 2),
	DESENVOLVIMENTO("Em desenvolvimento", 3), 
	TESTE("Testes", 4),
	HOMOLOGACAO("Homologação", 5),
	FIM("Fim", 6);

	private String descricao;
	private int etapa;
	
	EtapaProjeto(String descricao, int etapa) {
		this.descricao = descricao;
		this.etapa = etapa;
	}

	public String getDescricao() {
		return descricao;
	}

	public int getEtapa() {
		return etapa;
	}
}
