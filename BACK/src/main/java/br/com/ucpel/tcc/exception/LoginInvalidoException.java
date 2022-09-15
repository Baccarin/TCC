package br.com.ucpel.tcc.exception;

public class LoginInvalidoException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public LoginInvalidoException() {
		super("Login inválido");
	}
	
}
