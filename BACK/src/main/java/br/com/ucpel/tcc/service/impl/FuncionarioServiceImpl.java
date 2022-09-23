package br.com.ucpel.tcc.service.impl;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.FuncionarioFunction;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.service.api.FuncionarioService;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FuncionarioServiceImpl implements FuncionarioService {

	private final FuncionarioRepository repository;
	private final UsuarioRepository usuarioRepository;

	private final FuncionarioFunction funcionarioFunction;


	@Override
	// Ao deletar funcionário, inativa seu respectivo usuário;
	public void deletarFuncionario(FuncionarioVO vo) throws RegistroNaoEncontradoException {
		Funcionario f = repository.findById(vo.getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Funcionario.class, vo.getId()));

		Usuario u = usuarioRepository.findById(f.getUsuario().getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Usuario.class, vo.getIdUsuario()));
		

		u.setAtivo(false);
		usuarioRepository.save(u);

		repository.delete(f);
	}

	@Override
	public Funcionario salvarFuncionario(FuncionarioVO vo) {	
		return repository.save(funcionarioFunction.convert(vo));
	}

	@Override
	public Funcionario atualizarFuncionario(FuncionarioVO vo) {
		return repository.save(funcionarioFunction.convert(vo));
	}

}
