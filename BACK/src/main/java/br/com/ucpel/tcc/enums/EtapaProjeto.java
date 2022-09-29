package br.com.ucpel.tcc.enums;

import java.util.Arrays;

public enum EtapaProjeto {

	INICIO("Estado inicial", 0), REQUISITOS("Em obtenção de requisitos", 1), DESENVOLVIMENTO("Em desenvolvimento", 2),
	TESTE("Testes", 3), HOMOLOGACAO("Homologação", 4), FIM("Fim", 5);

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

	public static EtapaProjeto getProximaEtapa(EtapaProjeto etapa) {
		return Arrays.asList(EtapaProjeto.values()).get(etapa.getEtapa() + 1);
	}

	public static EtapaProjeto converteEtapaProjeto(String etapa) {

		switch (etapa) {
			case "Estado inicial":
				return EtapaProjeto.INICIO;
	
			case "Em obtenção de requisitos":
				return EtapaProjeto.REQUISITOS;
	
			case "Em desenvolvimento":
				return EtapaProjeto.DESENVOLVIMENTO;
	
			case "Testes":
				return EtapaProjeto.TESTE;
	
			case "Homologação":
				return EtapaProjeto.HOMOLOGACAO;
	
			case "Fim":
				return EtapaProjeto.FIM;
	
			default:
				return null;
		}
	}
}
