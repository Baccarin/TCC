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

import br.com.ucpel.tcc.domain.Funcionario;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.repository.api.FuncionarioRepository;
import br.com.ucpel.tcc.service.api.FuncionarioService;
import br.com.ucpel.tcc.vo.EmpresaVO;
import br.com.ucpel.tcc.vo.FuncionarioVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/funcionario/")
@RequiredArgsConstructor
public class FuncionarioResource {

	private final FuncionarioRepository repository;
	
	private final FuncionarioService service;
	
	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de funcionários cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Funcionario>> buscaListaFuncionario() {
		List<Funcionario> funcionarios = repository.findAll();
		if (funcionarios.isEmpty()) {
			return new ResponseEntity<List<Funcionario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Funcionario>>(funcionarios, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byIdUsuario")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de funcionários por usuário cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Funcionario>> buscaListaFuncionarioByIdUsuario(@RequestBody FuncionarioVO vo) {
		List<Funcionario> funcionarios = repository.findFuncionarioByIdUsuario(vo.getIdUsuario());
		if (funcionarios.isEmpty()) {
			return new ResponseEntity<List<Funcionario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Funcionario>>(funcionarios, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byTextoGenerico")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de funcionarios por texto genérico.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Funcionario>> buscaListaFuncionarioByTextoGenerico(@RequestBody EmpresaVO vo) {
		List<Funcionario> funcionarios = repository.findFuncionarioTextoGenerico(vo.getTexto());
		if (funcionarios.isEmpty()) {
			return new ResponseEntity<List<Funcionario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Funcionario>>(funcionarios, HttpStatus.OK);
	}


	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Inserir novo funcionário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Funcionario> inserirNovoFuncionario(@RequestBody FuncionarioVO vo) {
		Funcionario funcionario = service.salvarFuncionario(vo);
		if (Objects.isNull(funcionario)) {
			return new ResponseEntity<Funcionario>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}

	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar funcionário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarFuncionario(@RequestBody FuncionarioVO vo) {
		try {
			service.deletarFuncionario(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (RegistroNaoEncontradoException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar funcionário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Funcionario> atualizarFuncionario(@RequestBody FuncionarioVO vo) {
		Funcionario funcionario = service.atualizarFuncionario(vo);
		if (Objects.isNull(funcionario)) {
			return new ResponseEntity<Funcionario>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}


}
