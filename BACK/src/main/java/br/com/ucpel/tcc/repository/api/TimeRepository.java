package br.com.ucpel.tcc.repository.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ucpel.tcc.domain.Time;

@Repository
public interface TimeRepository extends JpaRepository<Time, Long>{

	@Query("select t from Time t where UPPER(t.nome) like UPPER(:nome)")
	List<Time> findTimeByNome(@Param("nome") String nome);
	
	@Query("select t from Time t where t.lider.id = :idLider")
	List<Time> findTimeByIdLider(@Param("idLider") Long idLider);
	
	@Query("select t from Time t where UPPER(t.lider.pessoa.nome) like UPPER(:texto) or UPPER(t.nome) like UPPER(:texto)")
	List<Time> findTimeByTextoGenerico(@Param("texto") String texto);
	
}
