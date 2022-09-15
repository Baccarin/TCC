package br.com.ucpel.tcc.service.api;

import java.util.Optional;

import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.vo.UsuarioVO;

public interface UsuarioService {

	void deletarUsuario(UsuarioVO vo) throws RegistroNaoEncontradoException;
	
	Optional<String> getToken(String login, String senha) throws Exception;
	
	Usuario inserirUsuario(UsuarioVO vo);
	
	Usuario atualizarUsuario(UsuarioVO vo);

}
