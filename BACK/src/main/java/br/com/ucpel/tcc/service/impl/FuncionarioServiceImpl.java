package br.com.ucpel.tcc.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.FuncionarioFunction;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.repository.api.TimeRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.service.api.FuncionarioService;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FuncionarioServiceImpl implements FuncionarioService {

	private final FuncionarioRepository repository;
	private final TimeRepository timeRepository;
	
	private final FuncionarioFunction funcionarioFunction;


	@Override
	public void deletarFuncionario(FuncionarioVO vo) throws RegistroNaoEncontradoException, ExclusaoInvalidaRegistrosDependentesException {
		
		List<Time> times = timeRepository.findTimeByIdLider(vo.getId());
		if (!times.isEmpty()) {
			throw new ExclusaoInvalidaRegistrosDependentesException(" Funcionario ", " Time ", vo.getId());
		}
		
		Funcionario f = repository.findById(vo.getId())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Funcionario.class, vo.getId()));

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
