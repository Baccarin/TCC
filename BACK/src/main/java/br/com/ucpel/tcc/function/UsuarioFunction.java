package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.vo.UsuarioVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UsuarioFunction implements Converter<UsuarioVO, Usuario> {

	private final FuncionarioRepository funcionarioRepository;
	private final UsuarioRepository usuarioRepository;

	public Usuario convert(UsuarioVO vo) {

		Funcionario f = Objects.isNull(vo.getIdFuncionario()) || vo.getIdFuncionario() == 0 ? null
				: funcionarioRepository.findById(vo.getIdFuncionario()).get();

		Usuario u = Objects.isNull(vo.getIdUsuario()) || vo.getIdUsuario() == 0 ? new Usuario()
				: usuarioRepository.findById(vo.getIdUsuario()).get();

		boolean loginExiste = Objects.nonNull(usuarioRepository.findUsuarioByLogin(vo.getLogin()));

		if (Objects.nonNull(f)) {
			u.setFuncionario(f);
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
