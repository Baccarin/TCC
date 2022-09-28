package br.com.ucpel.tcc.repository.api;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ucpel.tcc.domain.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query("select u from Usuario u where u.funcionario =:idFuncionario")
	Optional<Usuario> findUsuarioByIdFuncionario(@Param("idFuncionario") Long idFuncionario);
	
	@Query("select u from Usuario u where u.login like :login")
	Usuario findUsuarioByLogin(@Param("login") String login);

	@Query("select u from Usuario u where u.dataCadastro < :dataCadastro")
	List<Usuario> findUsuarioByDataCadastroMenor(@Param("dataCadastro") Calendar dataNascimento);

	@Query("select u from Usuario u where u.dataCadastro > :dataCadastro")
	List<Usuario> findUsuarioByDataCadastroMaior(@Param("dataCadastro") Calendar dataNascimento);

	@Query("select u from Usuario u where u.login like :texto or UPPER(u.funcionario.pessoa.nome) like UPPER(:texto) ")
	List<Usuario> findUsuarioTextoGenerico(@Param("texto") String texto);
}
