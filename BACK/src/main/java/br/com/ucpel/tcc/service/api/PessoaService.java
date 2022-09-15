package br.com.ucpel.tcc.service.api;

import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.vo.PessoaVO;

public interface PessoaService {

	void deletarPessoa(PessoaVO vo) throws RegistroNaoEncontradoException;
	
	Pessoa inserirPessoa(PessoaVO vo);
	
	Pessoa atualizarPessoa(PessoaVO vo);
	
}
