package br.com.ucpel.tcc.exception;

public class ExclusaoInvalidaRegistrosDependentesException extends Exception {

	private static final long serialVersionUID = 1L;

	public ExclusaoInvalidaRegistrosDependentesException(Object classe, Object classeDependente,  Long id) {
		super("Registro da classe:" + classe + " de id: " + id + " não pode ser excluido pois existem registros da classe: " 
				+ classeDependente + " que são dependetes dele.");
	}
	
	
}
