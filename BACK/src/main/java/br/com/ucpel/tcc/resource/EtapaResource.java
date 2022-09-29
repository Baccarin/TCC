	package br.com.ucpel.tcc.resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ucpel.tcc.enums.EtapaProjeto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tcc/etapa/")
@RequiredArgsConstructor
public class EtapaResource {

	@GetMapping("buscaLista")
	@CrossOrigin(origins = "*")
	@ApiOperation(value = "Busca lista de etapas disponíves.")
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<List<String>> buscaListaEtapas() {
		List<String> lista = new ArrayList<String>();
		Arrays.asList(EtapaProjeto.values()).forEach(etapa -> lista.add(etapa.getDescricao()));
		return new ResponseEntity<List<String>>(lista, HttpStatus.OK);
	}
	
}
