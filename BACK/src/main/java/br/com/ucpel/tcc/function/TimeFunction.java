package br.com.ucpel.tcc.function;

import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.repository.api.TimeRepository;
import br.com.ucpel.tcc.vo.TimeVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TimeFunction implements Converter<TimeVO, Time> {

	private final TimeRepository repository;
	private final FuncionarioRepository funcionarioRepository;

	@Override
	public Time convert(TimeVO vo) {

		Time t = Objects.isNull(vo.getIdTime()) || vo.getIdTime() == 0 ? new Time()
				: repository.findById(vo.getIdTime()).get();

		Funcionario lider = Objects.isNull(vo.getIdLider()) || vo.getIdLider() == 0 ? null
				: funcionarioRepository.findById(vo.getIdLider()).get();

		if (Objects.nonNull(lider)) {
			t.setLider(lider);
		}
		if (Objects.nonNull(vo.getNome())) {
			t.setNome(vo.getNome());
		}

		if (Objects.nonNull(vo.getIdFuncionarios())) {
			vo.getIdFuncionarios().forEach(id -> {
				Funcionario func = funcionarioRepository.findById(id).orElse(null);
				if (Objects.nonNull(func)) {
					t.getFuncionarios().add(func);
				}
			});
		}

		return t;
	}

}
