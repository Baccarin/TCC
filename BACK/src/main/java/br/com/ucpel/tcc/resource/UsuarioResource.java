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
import br.com.ucpel.tcc.domain.Usuario;
import br.com.ucpel.tcc.exception.RegistroNaoEncontradoException;
import br.com.ucpel.tcc.function.UsuarioFunction;
import br.com.ucpel.tcc.repository.api.PessoaRepository;
import br.com.ucpel.tcc.repository.api.UsuarioRepository;
import br.com.ucpel.tcc.service.api.UsuarioService;
import br.com.ucpel.tcc.vo.EmpresaVO;
import br.com.ucpel.tcc.vo.UsuarioVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/usuario/")
@RequiredArgsConstructor
public class UsuarioResource {

	private final UsuarioRepository repository;
	
	private final UsuarioService service;
		
	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuários cadastrados.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Usuario>> buscaListaUsuario() {
		List<Usuario> usuarios = repository.findAll();
		if (usuarios.isEmpty()) {
			return new ResponseEntity<List<Usuario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byIdPessoa")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuários por id da pessoa cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Usuario>> buscaListaUsuarioByIdPessoa(@RequestBody UsuarioVO vo) {
		List<Usuario> usuarios = repository.findUsuarioByIdPessoa(vo.getIdPessoa());
		if (usuarios.isEmpty()) {
			return new ResponseEntity<List<Usuario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byLogin")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuários por login cadastradas.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Usuario> buscaListaUsuarioByLogin(@RequestBody UsuarioVO vo) {
		Usuario usuario = repository.findUsuarioByLogin(vo.getLogin());
		if (Objects.isNull(usuario)) {
			return new ResponseEntity<Usuario>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byMaiorDataCadastro")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuários cadastrados após que a data informada.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Usuario>> buscaListaUsuarioByDataNascimentoMaior(@RequestBody UsuarioVO vo) {
		List<Usuario> usuarios = repository.findUsuarioByDataCadastroMaior(vo.getDataCadastro());
		if (usuarios.isEmpty()) {
			return new ResponseEntity<List<Usuario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}

	@PostMapping("buscaLista/byMenorDataCadastro")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuários cadastrados anteriormente que a data informada.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Usuario>> buscaListaUsuarioByDataNascimentoMenor(@RequestBody UsuarioVO vo) {
		List<Usuario> usuarios = repository.findUsuarioByDataCadastroMenor(vo.getDataCadastro());
		if (usuarios.isEmpty()) {
			return new ResponseEntity<List<Usuario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}
	
	@PostMapping("buscaLista/byTextoGenerico")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de usuarios por texto genérico.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<Usuario>> buscaListaUsuariosByTextoGenerico(@RequestBody UsuarioVO vo) {
		List<Usuario> usuarios = repository.findUsuarioTextoGenerico(vo.getTexto());
		if (usuarios.isEmpty()) {
			return new ResponseEntity<List<Usuario>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}
	
	@PostMapping("salvar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Inserir novo usuário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Usuario> inserirNovoUsuario(@RequestBody UsuarioVO vo) {
		Usuario usuario = service.inserirUsuario(vo);
		if (Objects.isNull(usuario)) {
			return new ResponseEntity<Usuario>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}

	@PostMapping("deletar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Deletar usuário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<String> deletarUsuario(@RequestBody UsuarioVO vo) {
		try {
			service.deletarUsuario(vo);
			return new ResponseEntity<String>("Registro excluido com sucesso", HttpStatus.OK);
		} catch (RegistroNaoEncontradoException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("atualizar")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Atualizar usuário.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<Usuario> atualizarUsuario(@RequestBody UsuarioVO vo) {
		Usuario usuario = service.inserirUsuario(vo);
		if (Objects.isNull(usuario)) {
			return new ResponseEntity<Usuario>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}
	
}
