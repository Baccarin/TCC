package br.com.ucpel.tcc.resource;

import java.util.Objects;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ucpel.tcc.service.api.UsuarioService;
import br.com.ucpel.tcc.vo.UsuarioVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc")
@RequiredArgsConstructor
public class SolicitacaoLoginResource {

	private final UsuarioService service;
	
	@CrossOrigin(origins = "*")
	@PostMapping("login")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation("Faz login.")
	public ResponseEntity<Object> getLogin(@RequestBody UsuarioVO vo) {
		try {
			Optional<String> token = service.getToken(vo.getLogin(), vo.getSenha());
			if (Objects.isNull(token)) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<Object>(token.get(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
