package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.vo.UsuarioVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UsuarioFunction implements Converter<UsuarioVO, Usuario> {

	private final PessoaRepository pessoaRepository;
	private final UsuarioRepository usuarioRepository;

	public Usuario convert(UsuarioVO vo) {

		Pessoa p = Objects.isNull(vo.getIdPessoa()) || vo.getIdPessoa() == 0 ? null
				: pessoaRepository.findById(vo.getIdPessoa()).get();

		Usuario u = Objects.isNull(vo.getIdUsuario()) || vo.getIdUsuario() == 0 ? new Usuario()
				: usuarioRepository.findById(vo.getIdUsuario()).get();

		boolean loginExiste = Objects.nonNull(usuarioRepository.findUsuarioByLogin(vo.getLogin()));

		if (Objects.nonNull(p)) {
			u.setPessoa(p);
		}
		if (Objects.nonNull(vo.getDataCadastro())) {
			u.setDataCadastro(vo.getDataCadastro());
		}
		if (!loginExiste) {
			if (Objects.nonNull(vo.getLogin())) {
				u.setLogin(vo.getLogin());
			}
		} else {
			return null;
		}
		if (Objects.nonNull(vo.getSenha())) {
			u.setSenha(vo.getSenha());
		}

		return u;
	}

}
