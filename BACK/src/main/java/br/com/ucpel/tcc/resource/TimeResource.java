package br.com.ucpel.tcc.resource;

import java.util.List;
import java.util.Objects;

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

import br.com.ucpel.tcc.domain.Time;
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.repository.api.TimeRepository;
import br.com.ucpel.tcc.service.api.TimeService;
import br.com.ucpel.tcc.vo.TimeVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/time/")
@RequiredArgsConstructor
public class TimeResource {

	private final TimeRepository repository;

	private final TimeService service;

	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de times cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Time>> buscaListaTimes() {
		List<Time> times = repository.findAll();
		if (times.isEmpty()) {
			return new ResponseEntity<List<Time>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Time>>(times, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byIdLider")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de times cadastrados pelo id do líder.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Time>> buscaListaTimesByLider(@RequestBody TimeVO vo) {
		List<Time> times = repository.findTimeByIdLider(vo.getIdLider());
		if (times.isEmpty()) {
			return new ResponseEntity<List<Time>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Time>>(times, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byNome")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de times cadastrados pelo nome.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Time>> buscaListaTimesByNome(@RequestBody TimeVO vo) {
		List<Time> times = repository.findTimeByNome(vo.getNome());
		if (times.isEmpty()) {
			return new ResponseEntity<List<Time>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Time>>(times, HttpStatus.OK);
	}
	
	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Inserir novo time.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Time> inserirNovoTime(@RequestBody TimeVO vo) {
		Time pessoa = service.salvarTime(vo);
		if (Objects.isNull(pessoa)) {
			return new ResponseEntity<Time>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Time>(pessoa, HttpStatus.OK);
	}

	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar time.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarTime(@RequestBody TimeVO vo) {
		try {
			service.deletarTime(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (ExclusaoInvalidaRegistrosDependentesException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar time.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Time> atualizarTime(@RequestBody TimeVO vo) {
		Time time = service.atualizarTime(vo);
		if (Objects.isNull(time)) {
			return new ResponseEntity<Time>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Time>(time, HttpStatus.OK);
	}
	
}
