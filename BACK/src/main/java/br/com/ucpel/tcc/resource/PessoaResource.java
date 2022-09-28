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

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.domain.Pessoa;
import br.com.ucpel.tcc.enums.Sexo;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.PessoaFunction;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.service.api.PessoaService;
import br.com.ucpel.tcc.vo.EmpresaVO;
import br.com.ucpel.tcc.vo.PessoaVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/pessoa/")
@RequiredArgsConstructor
public class PessoaResource {

	private final PessoaRepository repository;

	private final PessoaService service;

	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de pessoas cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoa() {
		List<Pessoa> pessoas = repository.findAll();
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}
	
	
	@PostMapping("buscaById")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca pessoa pelo id cadastrado.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Pessoa> buscaPessoaById(@RequestBody PessoaVO vo) {
		Pessoa pessoa = repository.findById(vo.getIdPessoa()).orElse(null);
		if (Objects.isNull(pessoa)) {
			return new ResponseEntity<Pessoa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byNome")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de pessoas por nome cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoaByNome(@RequestBody PessoaVO vo) {
		List<Pessoa> pessoas = repository.findPessoaByNome(vo.getNome());
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byEmail")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de pessoas por email cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoaByEmail(@RequestBody PessoaVO vo) {
		List<Pessoa> pessoas = repository.findPessoaByEmail(vo.getEmail());
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byMaiorDataNascimento")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de pessoas cadastradas mais velhas que a data informada.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoaByDataNascimentoMaior(@RequestBody PessoaVO vo) {
		List<Pessoa> pessoas = repository.findPessoaByDataNascimentoMaior(vo.getDataNascimento());
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byMenorDataNascimento")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de pessoas cadastradas mais novas que a data informada.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoaByDataNascimentoMenor(@RequestBody PessoaVO vo) {
		List<Pessoa> pessoas = repository.findPessoaByDataNascimentoMenor(vo.getDataNascimento());
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byTextoGenerico")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de empresas por texto genérico.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Pessoa>> buscaListaPessoaByTextoGenerico(@RequestBody PessoaVO vo) {
		List<Pessoa> pessoas = repository.findPessoaByTextoGenerico(vo.getTexto());
		if (pessoas.isEmpty()) {
			return new ResponseEntity<List<Pessoa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Pessoa>>(pessoas, HttpStatus.OK);
	}
	
	@GetMapping("buscaLista/sexos")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de sexos cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Sexo>> buscaListaSexos() {
		return new ResponseEntity<List<Sexo>>(Sexo.getListaSexos(), HttpStatus.OK);
	}

	
	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Inserir nova pessoa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Pessoa> inserirNovaPessoa(@RequestBody PessoaVO vo) {
		Pessoa pessoa = service.inserirPessoa(vo);
		if (Objects.isNull(pessoa)) {
			return new ResponseEntity<Pessoa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
	}

	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar pessoa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarPessoa(@RequestBody PessoaVO vo) {
		try {
			service.deletarPessoa(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (RegistroNaoEncontradoException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar pessoa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Pessoa> atualizarPessoa(@RequestBody PessoaVO vo) {
		Pessoa pessoa = service.atualizarPessoa(vo);
		if (Objects.isNull(pessoa)) {
			return new ResponseEntity<Pessoa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Pessoa>(pessoa, HttpStatus.OK);
	}

}
