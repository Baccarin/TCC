package br.com.ucpel.tcc.service.api;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.exception.ProximaEtapaProjetoInvalidaException;
import br.com.ucpel.tcc.exception.RegistroInativoException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.vo.ProjetoVO;

public interface ProjetoService {

	void deletarProjeto(ProjetoVO vo) throws RegistroNaoEncontradoException, RegistroInativoException;
	
	Projeto inserirProjeto(ProjetoVO vo);
	
	Projeto atualizarProjeto(ProjetoVO vo);
	
	void avancarEtapaProjeto(ProjetoVO vo) throws RegistroNaoEncontradoException, ProximaEtapaProjetoInvalidaException ;

}
