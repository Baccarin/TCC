package br.com.ucpel.tcc.service.api;

import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.vo.TimeVO;

public interface TimeService {

	void deletarTime(TimeVO vo) throws ExclusaoInvalidaRegistrosDependentesException;

	Time salvarTime(TimeVO vo);
	
	Time atualizarTime(TimeVO vo);
	
}
