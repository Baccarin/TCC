package br.com.ucpel.tcc.function;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Objects;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.enums.EtapaProjeto;
import br.com.ucpel.tcc.enums.MetodologiaAgil;
import br.com.ucpel.tcc.repository.api.ProjetoRepository;
import br.com.ucpel.tcc.repository.api.TimeRepository;
import br.com.ucpel.tcc.vo.ProjetoVO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProjetoFunction implements Converter<ProjetoVO, Projeto> {

	private final ProjetoRepository repository;
	private final TimeRepository timeRepository;

	@Override
	public Projeto convert(ProjetoVO vo) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");

		Projeto projeto = Objects.isNull(vo.getIdProjeto()) || vo.getIdProjeto() == 0 ? new Projeto()
				: repository.findById(vo.getIdProjeto()).get();

		try {
			if (Objects.nonNull(vo.getDataInicio())) {
				projeto.setDataInicio(sdf.parse(vo.getDataInicio()));
			}
			if (Objects.nonNull(vo.getDataFim())) {
				projeto.setDataFim(sdf.parse(vo.getDataFim()));
			}
		} catch (ParseException e) {

		}

		if (Objects.nonNull(vo.getEtapa())) {
			projeto.setEtapa(EtapaProjeto.valueOf(vo.getEtapa()));
		}

		if (Objects.nonNull(vo.getMetodologia())) {
			projeto.setMetodologiaAplicada(MetodologiaAgil.valueOf(vo.getMetodologia()));
		}
		if (Objects.nonNull(vo.getIdTime())) {
			Time time = timeRepository.findById(vo.getIdTime()).orElse(null);
			if (Objects.nonNull(time)) {
				projeto.setTime(time);
			}

		}
		if (Objects.nonNull(vo.getNome())) {
			projeto.setNome(vo.getNome());
		}

		return projeto;
	}

}
