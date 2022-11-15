package br.com.ucpel.tcc.enums;

import java.util.HashMap;
import java.util.Map;

public enum MetodologiaAgil {

	XP("XP"),
	SCRUM("Scrum"),
	CRYSTAL("Crystal"), 
	KANBAN("Kanban"),
	LEAN("Lean"),
	FDD("FDD");

	private String descricao;
	
	private static final Map<String, MetodologiaAgil> metodologiaPorValor = new HashMap();
	
	static {
		for (MetodologiaAgil metodologia : MetodologiaAgil.values()) {
			metodologiaPorValor.put(metodologia.getDescricao().toUpperCase(), metodologia);
		}
	}
	
	public static MetodologiaAgil metodolodiaPorValor(String metodologia) {
		return metodologiaPorValor.get(metodologia);
	}
	

	MetodologiaAgil(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
}
