package br.com.ucpel.tcc.enums;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum PerguntasMetodologias {

	TAMANHO_TIME_SCRUM("Tamanho do time se enquadra entre 3 e 9 pessoas?", MetodologiaAgil.SCRUM),
	REUNIOES_DIARIAS_SCRUM("Possível realizar reuniões rápidas e diárias?", MetodologiaAgil.SCRUM),
	ENTREGAS_ENTRE_20_40_DIAS_SCRUM("Possível realizar entregas dentro do período de vinte e quarenta dias?", MetodologiaAgil.SCRUM),
	MEMBROS_ACESSO_TOTAL_SCRUM("Membros terão acesso a fatos que poderão afetar a organização pro projeto?", MetodologiaAgil.SCRUM),
	INSPECOES_PELO_RESPONSAVEL_SCRUM("Serão realizadas inspeções pelo responsável periodicamente?", MetodologiaAgil.SCRUM),
	TIME_MULTIDISCIPLINAR_SCRUM("O time possui é auto-organizado e interdisciplinar?", MetodologiaAgil.SCRUM),

	DURACAO_ENTRE_1_3_MESES_CRYSTAL("Projeto possui um ciclo de duração entre 1 e 3 meses ?", MetodologiaAgil.CRYSTAL),
	VERSAO_ENTRE_20_E_40_DIAS_CRYSTAL("Uma versão poderá ser entregue ao cliente a cada vinte à quarenta dias? ", MetodologiaAgil.CRYSTAL),
	DESENVOLVEDORES_AUTONOMIA_CRYSTAL("Os desenvolvedores terão autonomia para escolher quais funcionalidades serão incluídas em cada versão?", MetodologiaAgil.CRYSTAL),
	EXIPERIENCIA_COM_CRYSTAL(" Existem pessoas experientes com a metodologia?", MetodologiaAgil.CRYSTAL),
	MULTIPAPEIS_CRYSTAL("Uma pessoa poderá assumir mais de um papel dentro do time?", MetodologiaAgil.CRYSTAL),
	
	EXCLUSÃO_PROCESSOS_INUTEIS_LEAN("Todo processo que não seja relevante para o desenvolvimento será eliminado?", MetodologiaAgil.LEAN),
	DESCISOES_MAIS_TARDE_POSSIVEL_LEAN("Decisões serão tomadas o mais tarde possível?", MetodologiaAgil.LEAN),
	VERSOES_MAIS_RAPIDO_POSSIVEL_LEAN("Uma versão será disponibilizada o mais rápido possível?", MetodologiaAgil.LEAN),
	GERENTE_INCENTIVANDO_TIME_LEAN("Gerente irá incentivar o progresso, avaliar erros e corrigir o rumo do desenvolvimento?", MetodologiaAgil.LEAN),
	
	VISUALIZACAO_FLUXO_INTEIRO_KANBAN("O fluxo inteiro de trabalho pode ser visualizado?", MetodologiaAgil.KANBAN),
	FLUXO_TRABALHO_CONTINUO_KANBAN("O fluxo de trabalho é contínuo? ", MetodologiaAgil.KANBAN),
	ESQUEMA_ETAPAS_DESENVOLVIDO_KANBAN("Um esquema contendo todas etapas do processo foi desenvolvido?", MetodologiaAgil.KANBAN),
	SEPARACAO_CLARA_ENTRE_ETAPAS_KANBAN("Existe uma separação clara entre as etapas?", MetodologiaAgil.KANBAN),
	
	PROGRAMADORES_DEFINEM_DURACAO_E_ESCOPO_ITERACOES_XP("Programadores que definem a duração e o escopo das iterações? ", MetodologiaAgil.XP),
	VERSAO_ENTRE_45_E_60_DIAS_XP("Uma versão será gerada a cada 45 - 60 dias?", MetodologiaAgil.XP),
	DESENVOLVIMENTO_DIRIGIDO_A_TESTES_XP("Desenvolvimento será dirigido a testes?", MetodologiaAgil.XP),
	PROGRAMACAO_PARES_XP("O desenvolvimento será feita em pares?", MetodologiaAgil.XP),
	PADRAO_CODIFICACAO_XP("Um padrão de codificação será definido antes do início do projeto?", MetodologiaAgil.XP);
	


	private String descricao;
	private MetodologiaAgil metodologia;
	
	private static final Map<String, PerguntasMetodologias> perguntaPorValor = new HashMap();
	
	static {
		for (PerguntasMetodologias pergunta : PerguntasMetodologias.values()) {
			perguntaPorValor.put(pergunta.getDescricao(), pergunta);
		}
	}
	
	public static PerguntasMetodologias perguntaPorValor(String pergunta) {
		return perguntaPorValor.get(pergunta);
	}
	
	PerguntasMetodologias(String descricao,  MetodologiaAgil metodologia) {
		this.descricao = descricao;
		this.metodologia = metodologia;

	}
	
	public static List<PerguntasMetodologias> getPerguntasMetodologia() {
		return Arrays.asList(PerguntasMetodologias.values());
	}
	
	public String getDescricao() {
		return descricao;
	}

	public MetodologiaAgil getMetodologiaAgil() {
		return metodologia;
	}

}
