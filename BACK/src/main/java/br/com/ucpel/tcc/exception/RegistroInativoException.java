package br.com.ucpel.tcc.exception;

public class RegistroInativoException extends Exception {

	private static final long serialVersionUID = 1L;

	public RegistroInativoException(Object classe, Long id) {
		super("Registro da classe:" + classe + " de id: " + id + " não pode ser alterado pois está inativo.");
	}
	
}
