package br.com.ucpel.tcc.service.impl;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.function.TimeFunction;
import br.com.ucpel.tcc.repository.api.TimeRepository;
import br.com.ucpel.tcc.service.api.TimeService;
import br.com.ucpel.tcc.vo.TimeVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TimeServiceImpl implements TimeService {

	private final TimeRepository repository;
	private final TimeFunction function;

	@Override
	public void deletarTime(TimeVO vo) throws ExclusaoInvalidaRegistrosDependentesException {
		Boolean times = repository.findById(vo.getIdTime()).isEmpty();
		if (times) {
			throw new ExclusaoInvalidaRegistrosDependentesException(Time.class, Funcionario.class, vo.getIdTime());
		}
		repository.delete(function.convert(vo));
	}

	@Override
	public Time salvarTime(TimeVO vo) {
		return repository.save(function.convert(vo));
	}

	@Override
	public Time atualizarTime(TimeVO vo) {
		return repository.save(function.convert(vo));
	}

}
