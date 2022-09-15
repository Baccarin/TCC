package br.com.ucpel.tcc.repository.api;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ucpel.tcc.domain.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{

	@Query("select e from Empresa e where UPPER(e.nome) like UPPER(:nome)")
	List<Empresa> findEmpresaByNome(@Param("nome") String nome);
	

	@Query("select e from Empresa e where e.cnpj like :cnpj")
	List<Empresa> findEmpresaByCNPJ(@Param("cnpj") String cnpj);

}
