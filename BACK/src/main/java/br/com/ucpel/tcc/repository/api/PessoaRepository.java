package br.com.ucpel.tcc.repository.api;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ucpel.tcc.domain.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	@Query("select p from Pessoa p where UPPER(p.nome) like UPPER(:nome)")
	List<Pessoa> findPessoaByNome(@Param("nome") String nome);

	@Query("select p from Pessoa p where UPPER(p.email) like UPPER(:email)")
	List<Pessoa> findPessoaByEmail(@Param("email") String email);

	@Query("select p from Pessoa p where UPPER(p.sexo) like UPPER(:sexo)")
	List<Pessoa> findPessoaBySexo(@Param("sexo") String sexo);

	@Query("select p from Pessoa p where p.dataNascimento < :dataNascimento")
	List<Pessoa> findPessoaByDataNascimentoMenor(@Param("dataNascimento") Calendar dataNascimento);

	@Query("select p from Pessoa p where p.dataNascimento > :dataNascimento")
	List<Pessoa> findPessoaByDataNascimentoMaior(@Param("dataNascimento") Calendar dataNascimento);
	
	@Query("select p from Pessoa p where UPPER(p.sexo) like UPPER(:texto) or UPPER(p.email) like UPPER(:texto) or UPPER(p.nome) like UPPER(:texto)")
	List<Pessoa> findPessoaByTextoGenerico(@Param("texto") String texto);

}
