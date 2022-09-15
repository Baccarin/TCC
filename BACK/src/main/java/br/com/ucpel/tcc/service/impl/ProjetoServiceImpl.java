package br.com.ucpel.tcc.service.impl;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.enums.EtapaProjeto;
import br.com.ucpel.tcc.exception.ProximaEtapaProjetoInvalidaException;
import br.com.ucpel.tcc.exception.RegistroInativoException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.ProjetoFunction;
import br.com.ucpel.tcc.repository.api.ProjetoRepository;
import br.com.ucpel.tcc.service.api.ProjetoService;
import br.com.ucpel.tcc.vo.ProjetoVO;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjetoServiceImpl implements ProjetoService{
	
	
	private final ProjetoRepository repository;
	private final ProjetoFunction function;
	
	@Override
	public void deletarProjeto(ProjetoVO vo) throws RegistroNaoEncontradoException, RegistroInativoException {
		Projeto projeto = repository.findById(vo.getIdProjeto()).orElseThrow( () ->
		new RegistroNaoEncontradoException(Projeto.class, vo.getIdProjeto()));
		if (projeto.getAtivo()) {
			if (projeto.getEtapa() != EtapaProjeto.INICIO ||
					projeto.getEtapa() != EtapaProjeto.REQUISITOS) {
				repository.delete(projeto);			
			}else {
				projeto.setAtivo(false);
				repository.save(projeto);
			}			
		}
	
		throw new RegistroInativoException(Projeto.class, vo.getIdProjeto());
		
	}

	@Override
	public Projeto inserirProjeto(ProjetoVO vo) {
		return repository.save(function.convert(vo));
	}

	@Override
	public Projeto atualizarProjeto(ProjetoVO vo) {
		return repository.save(function.convert(vo));
	}

	@Override
	public void avancarEtapaProjeto(ProjetoVO vo) throws RegistroNaoEncontradoException, ProximaEtapaProjetoInvalidaException {

		Projeto projeto = repository.findById(vo.getIdProjeto()).orElseThrow(
				() -> new RegistroNaoEncontradoException(Projeto.class, vo.getIdProjeto()));
		EtapaProjeto etapa = null;
		try {
			etapa = Arrays.asList(EtapaProjeto.values()).get(projeto.getEtapa().getEtapa() + 1);			
			projeto.setEtapa(etapa);
		} catch(Exception e) {
			throw new ProximaEtapaProjetoInvalidaException();
		}
		
	}

}
