package br.com.ucpel.tcc.resource;

import java.util.Comparator;
import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.repository.api.ProjetoRepository;
import br.com.ucpel.tcc.service.api.ProjetoService;
import br.com.ucpel.tcc.vo.ProjetoVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/projeto/")
@RequiredArgsConstructor
public class ProjetoResource {

	private final ProjetoRepository repository;
	private final ProjetoService service;
	
	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjeto() {
		List<Projeto> projetos = repository.findAll();
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byNome")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos pelo nome cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjetoByNome(@RequestBody ProjetoVO vo) {
		List<Projeto> projetos = repository.findProjetoByNome(vo.getNome());
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}

	
	@PostMapping("buscaLista/byEtapa")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos pela etapa cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjetoByEtapa(@RequestBody ProjetoVO vo) {
		List<Projeto> projetos = repository.findProjetoByEtapa(vo.getEtapa());
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byMetodologia")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos pela metodologia cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjetoByMetodologia(@RequestBody ProjetoVO vo) {
		List<Projeto> projetos = repository.findProjetoByMetodologia(vo.getMetodologia());
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byIdTime")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos pelo time cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjetoByIdTime(@RequestBody ProjetoVO vo) {
		List<Projeto> projetos = repository.findProjetoByTimeId(vo.getIdsTimes().get(0));
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
}
