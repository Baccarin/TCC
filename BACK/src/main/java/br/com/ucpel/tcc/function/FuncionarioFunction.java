package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.repository.api.EmpresaRepository;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FuncionarioFunction implements Converter<FuncionarioVO, Funcionario> {

	private final UsuarioRepository usuarioRepository;
	private final FuncionarioRepository repository;
	private final EmpresaRepository empresaRepository;
	
	@Override
	public Funcionario convert(FuncionarioVO vo) {
		Usuario u = Objects.isNull(vo.getIdUsuario()) || vo.getIdUsuario() == 0 ? null
				: usuarioRepository.findById(vo.getIdUsuario()).get();

		Empresa e = Objects.isNull(vo.getIdEmpresa()) || vo.getIdEmpresa() == 0 ? null
				: empresaRepository.findById(vo.getIdEmpresa()).get();
		
		Funcionario f = Objects.isNull(vo.getId()) || vo.getId() == 0 ? new Funcionario()
				: repository.findById(vo.getId()).get();

		
		
		if (Objects.nonNull(u)) {
			f.setUsuario(u);
		}

		if (Objects.nonNull(e)) {
			f.setEmpresa(e);
		}

		return f;

	}

}
