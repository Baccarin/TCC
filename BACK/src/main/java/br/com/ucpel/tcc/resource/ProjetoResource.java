package br.com.ucpel.tcc.resource;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import javax.ws.rs.Consumes;
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

import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.exception.ProximaEtapaProjetoInvalidaException;
import br.com.ucpel.tcc.exception.RegistroInativoException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.repository.api.ProjetoRepository;
import br.com.ucpel.tcc.service.api.ProjetoService;
import br.com.ucpel.tcc.vo.PessoaVO;
import br.com.ucpel.tcc.vo.ProjetoVO;
import br.com.ucpel.tcc.vo.TimeVO;
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
		List<Projeto> projetos = repository.findProjetoByTimeId(vo.getIdTime());
		projetos.sort(Comparator.comparing(Projeto::getDataInicio));
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byTextoGenerico")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de projetos por texto genérico.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Projeto>> buscaListaProjetosByTextoGenerico(@RequestBody ProjetoVO vo) {
		List<Projeto> projetos = repository.findProjetoByTextoGenerico(vo.getTexto());
		if (projetos.isEmpty()) {
			return new ResponseEntity<List<Projeto>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Projeto>>(projetos, HttpStatus.OK);
	}
	
	@PostMapping("buscaById")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca projeto pelo id.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Projeto> buscaProjetoById(@RequestBody ProjetoVO vo) {
		Projeto projeto = repository.findById(vo.getIdProjeto()).orElse(null);
		if (Objects.isNull(projeto)) {
			return new ResponseEntity<Projeto>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Projeto>(projeto, HttpStatus.OK);
	}
	
	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Salvar novo projeto.")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ResponseEntity<Projeto> salvarProjeto(@RequestBody ProjetoVO vo) {
		Projeto projeto = service.inserirProjeto(vo);
		if (Objects.isNull(projeto)) {
			return new ResponseEntity<Projeto>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Projeto>(projeto, HttpStatus.OK);
	}
	
	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar projeto.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarProjeto(@RequestBody ProjetoVO vo) throws RegistroInativoException {
		try {
			service.deletarProjeto(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (RegistroNaoEncontradoException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar projeto.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Projeto> atualizarProjeto(@RequestBody ProjetoVO vo) {
		Projeto projeto = service.atualizarProjeto(vo);
		if (Objects.isNull(projeto)) {
			return new ResponseEntity<Projeto>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Projeto>(projeto, HttpStatus.OK);
	}

	@PostMapping("avancaEtapa")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Avança de etapa projeto.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Projeto> avançarEtapaProjeto(@RequestBody ProjetoVO vo) throws RegistroNaoEncontradoException, ProximaEtapaProjetoInvalidaException {
		Projeto projeto = service.avancarEtapaProjeto(vo);
		if (Objects.isNull(projeto)) {
			return new ResponseEntity<Projeto>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Projeto>(projeto, HttpStatus.OK);
	}

}
