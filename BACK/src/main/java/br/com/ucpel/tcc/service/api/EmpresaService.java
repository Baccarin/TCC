package br.com.ucpel.tcc.service.api;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.vo.EmpresaVO;

public interface EmpresaService {

	void deletarEmpresa(EmpresaVO vo) throws ExclusaoInvalidaRegistrosDependentesException;

	Empresa salvarEmpresa(EmpresaVO vo);
	
	Empresa atualizarEmpresa(EmpresaVO vo);
	
}
