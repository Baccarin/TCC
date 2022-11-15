package br.com.ucpel.tcc.service.impl;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.enums.EtapaProjeto;
import br.com.ucpel.tcc.enums.MetodologiaAgil;
import br.com.ucpel.tcc.enums.PerguntasMetodologias;
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
public class ProjetoServiceImpl implements ProjetoService {

	private final ProjetoRepository repository;
	private final ProjetoFunction function;

	@Override
	public void deletarProjeto(ProjetoVO vo) throws RegistroNaoEncontradoException, RegistroInativoException {
		Projeto projeto = repository.findById(vo.getIdProjeto())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Projeto.class, vo.getIdProjeto()));
		if (projeto.getAtivo()) {
			if (projeto.getEtapa() != EtapaProjeto.INICIO && projeto.getEtapa() != EtapaProjeto.REQUISITOS) {
				repository.delete(projeto);
			} else {
				projeto.setAtivo(false);
				repository.save(projeto);
			}
			return;
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
	public Projeto avancarEtapaProjeto(ProjetoVO vo)
			throws RegistroNaoEncontradoException, ProximaEtapaProjetoInvalidaException {

		Projeto projeto = repository.findById(vo.getIdProjeto())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Projeto.class, vo.getIdProjeto()));
		try {
			projeto.setEtapa(EtapaProjeto.getProximaEtapa(projeto.getEtapa()));
			if (projeto.getEtapa() == EtapaProjeto.FIM) {
				projeto.setDataFim(Calendar.getInstance().getTime());
			}
			return repository.save(projeto);
		} catch (Exception e) {
			throw new ProximaEtapaProjetoInvalidaException();
		}

	}

	
	public HashMap<String, Double> contabilizaRespostas(ProjetoVO vo){
		HashMap<String, Double> maior = new HashMap<>();
		vo.getRespostas().forEach((pergunta, resposta) -> {
			double valor = 0;
			PerguntasMetodologias teste = PerguntasMetodologias.perguntaPorValor(pergunta);
			
			switch (PerguntasMetodologias.perguntaPorValor(pergunta).getMetodologiaAgil()) {

			case SCRUM:
				if (resposta == 1) {
					valor  = maior.getOrDefault("scrum", 0.00) ;
					maior.put("scrum", valor+1);
				}
				break;
			case CRYSTAL:
				if (resposta == 1) {
					valor  = maior.getOrDefault("crystal", 0.00) ;
					maior.put("crystal", valor+1);
				}
				break;
			case FDD:
				if (resposta == 1) {
					valor  = maior.getOrDefault("fdd", 0.00) ;
					maior.put("fdd", valor+1);
				}
				break;
			case KANBAN:
				if (resposta == 1) {
					valor  = maior.getOrDefault("kanban", 0.00) ;
					maior.put("kanban", valor+1);
				}
				break;
			case LEAN:
				if (resposta == 1) {
					valor = maior.getOrDefault("lean", 0.00) ;
					maior.put("lean", valor+1);
				}
				break;
			case XP:
				if (resposta == 1) {
					valor  = maior.getOrDefault("xp", 0.00) ;
					maior.put("xp", valor+1);
				}
				break;
			}	
		});
		
		return maior;
	}
	
	public HashMap<String, Double> contabilizaPesoRespostas(HashMap<String, Double> maior){
		
		maior.forEach((metodo, resposta) -> {
			double valor = 0;
			switch (metodo) {
			case "scrum" :
				valor  = maior.getOrDefault("scrum", 0.00) ;
				maior.put("scrum", valor/6);
				break;
			case "crystal":
				valor  = maior.getOrDefault("crystal", 0.00) ;
				maior.put("crystal", valor/5);
				break;
			case "fdd":
					valor  = maior.getOrDefault("fdd", 0.00) ;
					maior.put("fdd", valor);
				break;
			case "kanban":
					valor  = maior.getOrDefault("kanban", 0.00) ;
					maior.put("kanban", valor/4);			
				break;
			case "lean":				
					valor = maior.getOrDefault("lean", 0.00) ;
					maior.put("lean", valor/4);			
				break;
			case "xp":			
					valor  = maior.getOrDefault("xp", 0.00) ;
					maior.put("xp", valor/5);		
				break;
			}	
			
		});
		return maior;
	}
	
	@Override
	public Projeto escolheMetodologia(ProjetoVO vo) throws RegistroNaoEncontradoException {
		vo.setIdProjeto(6l);
		Projeto projeto = repository.findById(vo.getIdProjeto())
				.orElseThrow(() -> new RegistroNaoEncontradoException(Projeto.class, vo.getIdProjeto()));
		
		HashMap<String, Integer> maior2 = new HashMap<>();

		//scrum
		maior2.put("Tamanho do time se enquadra entre 3 e 9 pessoas?", 1);
		maior2.put("Possível realizar reuniões rápidas e diárias?", 1);
		
		//kaban
		maior2.put("O fluxo inteiro de trabalho pode ser visualizado?", 1);
		maior2.put("Um esquema contendo todas etapas do processo foi desenvolvido?", 1);

		//lean
		maior2.put("Todo processo que não seja relevante para o desenvolvimento será eliminado?", 1);
		maior2.put("Decisões serão tomadas o mais tarde possível?", 1);
		
		//xp
		maior2.put("Uma versão será gerada a cada 45 - 60 dias?", 1);
		maior2.put("Desenvolvimento será dirigido a testes?", 1);

		
		vo.setRespostas(maior2);
		

		HashMap<String, Double> maior = contabilizaRespostas(vo);
		maior = contabilizaPesoRespostas(maior);
		
		String indice = "";
		double valor = 0.00;
		HashMap<String, Double> maiores = new HashMap<>();
		for (Map.Entry<String, Double> entry : maior.entrySet()) {
		    if (valor <= entry.getValue()) {
		        indice = entry.getKey().toUpperCase(); 
		        valor = entry.getValue();
		        maiores.put(indice, valor);
		    }
		}
        System.out.println(maiores);
        
        if(maiores.size() == 1) {
        	projeto.setMetodologiaAplicada(MetodologiaAgil.metodolodiaPorValor(String.join("",maiores.keySet())));
        	projeto = repository.save(projeto);
        }

		return projeto;
	}

}
