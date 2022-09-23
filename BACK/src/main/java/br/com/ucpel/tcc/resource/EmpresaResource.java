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
import br.com.ucpel.tcc.exception.ExclusaoInvalidaRegistrosDependentesException;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.repository.api.EmpresaRepository;
import br.com.ucpel.tcc.service.api.EmpresaService;
import br.com.ucpel.tcc.vo.EmpresaVO;
import br.com.ucpel.tcc.vo.EmpresaVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/empresa/")
@RequiredArgsConstructor
public class EmpresaResource {

	private final EmpresaRepository repository;

	private final EmpresaService service;

	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de empresas cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Empresa>> buscaListaEmpresa() {
		List<Empresa> empresas = repository.findAll();
		if (empresas.isEmpty()) {
			return new ResponseEntity<List<Empresa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Empresa>>(empresas, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byNome")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de empresas por nomes cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Empresa>> buscaListaEmpresaByNome(@RequestBody EmpresaVO vo) {
		List<Empresa> empresas = repository.findEmpresaByNome(vo.getNome());
		if (empresas.isEmpty()) {
			return new ResponseEntity<List<Empresa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Empresa>>(empresas, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byId")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de empresas por id.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Empresa> buscaEmpresaById(@RequestBody EmpresaVO vo) {
		Empresa empresa = repository.findById(vo.getId()).orElseGet(null);
		if (Objects.isNull(empresa)) {
			return new ResponseEntity<Empresa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byCNPJ")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de empresas por CNPJ cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Empresa>> buscaListaEmpresaByCNPJ(@RequestBody EmpresaVO vo) {
		List<Empresa> empresas = repository.findEmpresaByCNPJ(vo.getCnpj());
		if (empresas.isEmpty()) {
			return new ResponseEntity<List<Empresa>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Empresa>>(empresas, HttpStatus.OK);
	}

	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Inserir nova empresa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Empresa> inserirNovoEmpresa(@RequestBody EmpresaVO vo) {
		Empresa empresa = service.salvarEmpresa(vo);
		if (Objects.isNull(empresa)) {
			return new ResponseEntity<Empresa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}

	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar empresa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Empresa> atualizarEmpresa(@RequestBody EmpresaVO vo) {
		Empresa empresa = service.salvarEmpresa(vo);
		if (Objects.isNull(empresa)) {
			return new ResponseEntity<Empresa>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK);
	}

	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar empresa.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarEmpresa(@RequestBody EmpresaVO vo)
			throws ExclusaoInvalidaRegistrosDependentesException {
		try {
			service.deletarEmpresa(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (ExclusaoInvalidaRegistrosDependentesException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
