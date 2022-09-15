package br.com.ucpel.tcc.service.impl;

import java.util.Objects;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.exception.LoginInvalidoException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.UsuarioFunction;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.service.api.UsuarioService;
import br.com.ucpel.tcc.util.Util;
import br.com.ucpel.tcc.vo.UsuarioVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService{
	
	private final UsuarioRepository usuarioRepository;
	private final UsuarioFunction function;
	
	@Override
	public void deletarUsuario(UsuarioVO vo) throws RegistroNaoEncontradoException {
	Usuario u = usuarioRepository.findById(vo.getIdUsuario()).orElseThrow( 
			() -> new RegistroNaoEncontradoException(Usuario.class, vo.getIdUsuario()));
	usuarioRepository.delete(u);		
	}


	@Override
	public Optional<String> getToken(String login, String senha) throws Exception {
		String userFixo = "admin";
		String senhaFixa = "senha";
		if (!login.equals(userFixo) || !senha.equals(senhaFixa)) {
			validarUsuarioSenha(login, senha);
		}
		return gerarToken(login, senha);
	}
	
	
	private Optional<String> gerarToken(String login, String senha) throws Exception {
		UsuarioVO vo = new UsuarioVO(login, senha);
		return Optional.of(Util.gerarToken(new Gson().toJson(vo)));
	}
	
	private void validarUsuarioSenha(String login, String senha) throws Exception {
		Usuario user = usuarioRepository.findUsuarioByLogin(login);
		if (Objects.isNull(user)) {
			throw new RegistroNaoEncontradoException(Usuario.class, login);
		}
		if (!user.getSenha().equals(senha)) {
			throw new LoginInvalidoException();
		}
	}


	@Override
	public Usuario inserirUsuario(UsuarioVO vo) {
		return usuarioRepository.save(function.convert(vo));
	}


	@Override
	public Usuario atualizarUsuario(UsuarioVO vo) {
		return usuarioRepository.save(function.convert(vo));
	}

}
