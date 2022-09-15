package br.com.ucpel.tcc.exception;

public class ProximaEtapaProjetoInvalidaException extends Exception {

	private static final long serialVersionUID = 1L;

	public ProximaEtapaProjetoInvalidaException() {
		super("Impossível avançar de etapa. Etapa final do projeto ja foi atingida.");
	}
	
}
