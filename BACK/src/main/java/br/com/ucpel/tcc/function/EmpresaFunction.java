package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.repository.api.EmpresaRepository;
import br.com.ucpel.tcc.vo.EmpresaVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmpresaFunction  implements Converter<EmpresaVO, Empresa>{

	private final EmpresaRepository repository;

	
	@Override
	public Empresa convert(EmpresaVO vo) {
		Empresa e = Objects.isNull(vo.getId()) || vo.getId() == 0 ? new Empresa() :
			repository.findById(vo.getId()).get();
		
		if (Objects.nonNull(vo.getCnpj())) {
			e.setCnpj(vo.getCnpj());
		}
		
		if (Objects.nonNull(vo.getNome())) {
			e.setNome(vo.getNome());
		}
		return e;
	}


}
