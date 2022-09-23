package br.com.ucpel.tcc.service.impl;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.function.EmpresaFunction;
import br.com.ucpel.tcc.repository.api.EmpresaRepository;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.service.api.EmpresaService;
import br.com.ucpel.tcc.vo.EmpresaVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EmpresaServiceImpl implements EmpresaService{
	
	private final FuncionarioRepository funcionarioRepository;
	private final EmpresaRepository repository;
	private final EmpresaFunction function;
	
	@Override
	public void deletarEmpresa(EmpresaVO vo) throws ExclusaoInvalidaRegistrosDependentesException {
		Boolean funcionarios = funcionarioRepository.findFuncionarioByEmpresaId(vo.getId()).isEmpty();
		if (!funcionarios) {
			throw new ExclusaoInvalidaRegistrosDependentesException(Empresa.class, 
					Funcionario.class, vo.getId());
		}
		repository.delete(function.convert(vo));
	}

	@Override
	public Empresa salvarEmpresa(EmpresaVO vo) {
		return repository.save(function.convert(vo));
	}

	@Override
	public Empresa atualizarEmpresa(EmpresaVO vo) {
		return repository.save(function.convert(vo));
	}

}
