package br.com.ucpel.tcc.exception;

public class RegistroNaoEncontradoException extends Exception {

	private static final long serialVersionUID = 1L;

	public RegistroNaoEncontradoException(Object classe, Long id) {
		super("Registro da classe:" + classe + " de id: " + id + " não foi encontrado.");
	}
	
	public RegistroNaoEncontradoException(Object classe, String mensagem) {
		super("Registro da classe:" + classe + " de com login: " + mensagem + " não foi encontrado.");
	}

}
