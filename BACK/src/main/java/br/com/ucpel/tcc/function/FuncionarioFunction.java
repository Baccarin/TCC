package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.repository.api.EmpresaRepository;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FuncionarioFunction implements Converter<FuncionarioVO, Funcionario> {

	private final FuncionarioRepository repository;
	private final EmpresaRepository empresaRepository;
	private final PessoaRepository pessoaRepository;
	
	@Override
	public Funcionario convert(FuncionarioVO vo) {
		Funcionario f = Objects.isNull(vo.getId()) || vo.getId() == 0 ? new Funcionario()
				: repository.findById(vo.getId()).get();

		Empresa e = Objects.isNull(vo.getIdEmpresa()) || vo.getIdEmpresa() == 0 ? null
				: empresaRepository.findById(vo.getIdEmpresa()).get();
		
		Pessoa p = Objects.isNull(vo.getIdPessoa()) || vo.getIdPessoa() == 0 ? null 
			: pessoaRepository.findById(vo.getIdPessoa()).get();
				
		if (Objects.nonNull(e)) {
			f.setEmpresa(e);
		}
		
		if (Objects.nonNull(p)) {
			f.setPessoa(p);
		}

		return f;

	}

}
