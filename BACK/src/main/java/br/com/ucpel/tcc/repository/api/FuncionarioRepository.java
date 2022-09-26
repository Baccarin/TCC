package br.com.ucpel.tcc.repository.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ucpel.tcc.domain.Empresa;
import br.com.ucpel.tcc.domain.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

	@Query("select f from Funcionario f where f.usuario.id = :idUsuario")
	List<Funcionario> findFuncionarioByIdUsuario(@Param("idUsuario") Long idUsuario);
	
	@Query("select f from Funcionario f where f.empresa.id = :empresa")
	List<Funcionario> findFuncionarioByEmpresaId(@Param("empresa") Long empresa);
	
	@Query("select f from Funcionario f where UPPER(f.usuario.pessoa.nome) like UPPER(:texto) or UPPER(f.empresa.nome) like UPPER(:texto) ")
	List<Funcionario> findFuncionarioTextoGenerico(@Param("texto") String texto);
	

}
