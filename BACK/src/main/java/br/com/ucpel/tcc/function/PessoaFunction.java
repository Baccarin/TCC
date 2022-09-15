package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.enums.Sexo;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import br.com.ucpel.tcc.vo.PessoaVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PessoaFunction implements Converter<PessoaVO, Pessoa> {

	private final PessoaRepository repository;

	public Pessoa convert(PessoaVO vo) {
		Pessoa p = Objects.isNull(vo.getIdPessoa()) || vo.getIdPessoa() == 0 ? new Pessoa() :
			repository.findById(vo.getIdPessoa()).get();
		
		if (Objects.nonNull(vo.getDataNascimento())) {
			p.setDataNascimento(vo.getDataNascimento());
		}
		if (Objects.nonNull(vo.getEmail())) {
			p.setEmail(vo.getEmail());
		}
		if (Objects.nonNull(vo.getNome())) {
			p.setNome(vo.getNome());
		}
		if (Objects.nonNull(vo.getSexo())) {
			p.setSexo(Sexo.valueOf(vo.getSexo()));
		}
		
		return p;
	}
	
	
	

	

}