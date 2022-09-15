package br.com.ucpel.tcc.service.impl;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.PessoaFunction;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.service.api.PessoaService;
import br.com.ucpel.tcc.vo.PessoaVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PessoaServiceImpl implements PessoaService{

	private final PessoaRepository pessoaRepository;
	private final PessoaFunction function;
	
	
	public void deletarPessoa(PessoaVO vo) throws RegistroNaoEncontradoException {
		Pessoa p = pessoaRepository.findById(vo.getIdPessoa()).orElseThrow( 
				() -> new RegistroNaoEncontradoException(Pessoa.class, vo.getIdPessoa()));
		pessoaRepository.delete(p);
	}

	@Override
	public Pessoa inserirPessoa(PessoaVO vo) {
		return pessoaRepository.save(function.convert(vo));
	}

	@Override
	public Pessoa atualizarPessoa(PessoaVO vo) {
		return pessoaRepository.save(function.convert(vo));
	}
	
	
}
