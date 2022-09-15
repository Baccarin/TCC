package br.com.ucpel.tcc.service.api;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.vo.FuncionarioVO;

public interface FuncionarioService {
	
	void deletarFuncionario(FuncionarioVO vo) throws RegistroNaoEncontradoException;

	Funcionario salvarFuncionario(FuncionarioVO vo);
	
	Funcionario atualizarFuncionario(FuncionarioVO vo);

}
