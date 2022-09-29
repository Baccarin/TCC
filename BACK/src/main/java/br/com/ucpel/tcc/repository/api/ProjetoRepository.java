package br.com.ucpel.tcc.repository.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.ucpel.tcc.domain.Projeto;
import br.com.ucpel.tcc.domain.Time;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

	@Query("select p from Projeto p where p.time.id =:idTime and p.ativo is true")
	List<Projeto> findProjetoByTimeId(@Param("idTime") Long idTime);
	
	@Query("select p from Projeto p where p.nome like :nome and p.ativo is true")
	List<Projeto> findProjetoByNome(@Param("nome") String nome);
	
	@Query("select p from Projeto p where p.etapa like :etapa and p.ativo is true")
 	List<Projeto> findProjetoByEtapa(@Param("etapa") String etapa);
 	
	@Query("select p from Projeto p where p.metodologiaAplicada like :metodologia and p.ativo is true")
 	List<Projeto> findProjetoByMetodologia(@Param("metodologia") String metodologia);
	
	@Query("select p from Projeto p where UPPER(p.nome) like UPPER(:texto) or UPPER(p.etapa) like UPPER(:texto) or UPPER(p.metodologiaAplicada) like UPPER(:texto) and p.ativo is true")
	List<Projeto> findProjetoByTextoGenerico(@Param("texto") String texto);
	
}
