package br.com.ucpel.tcc.resource;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import br.com.ucpel.tcc.util.Util;
import io.jsonwebtoken.Jwts;

public class ValidatorFilter extends BasicAuthenticationFilter{
	
	public ValidatorFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String atributo = request.getHeader("Authorization");
		if(atributo != null) {
			try {
				String token = atributo.replaceAll("Bearer ", "");
				UsernamePasswordAuthenticationToken user = getUsuarioSenhaToken(token);
				SecurityContextHolder.getContext().setAuthentication(user);
			} catch (Exception e) {
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
			}
		}
		chain.doFilter(request, response);
	}


	private UsernamePasswordAuthenticationToken getUsuarioSenhaToken(String token) throws Exception{
		String userSenha = "";
		if(!token.equals("")) {
			try {
				Base64.Decoder decoder = Base64.getDecoder();
				String[] chunks = token.split("\\.");
				String header = new String(decoder.decode(chunks[1]));
				HashMap<String, Object> retorno = Util.jsonFromHashMapString(header); 
				userSenha = retorno.get("sub").toString(); 
				String dataExpiracao = retorno.get("exp").toString();
				LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochSecond(Long.valueOf(dataExpiracao)), ZoneId.systemDefault());  
				Jwts.parserBuilder()
				.setSigningKey(Util.chave)
				.build()
				.parseClaimsJws(token);
				if(date.isBefore(LocalDateTime.now()) && !userSenha.equals("")) {
					UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(userSenha, null, new ArrayList<>());
					Util.chave = null;
					user.setAuthenticated(false);
					return user;
				}
			} catch (Exception e) {
				throw new Exception(Util.toJson("Token inválido."));
			}
		}
		return new UsernamePasswordAuthenticationToken(userSenha, null, new ArrayList<>());
	}
}
