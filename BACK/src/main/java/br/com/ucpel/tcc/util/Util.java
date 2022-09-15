package br.com.ucpel.tcc.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class Util {

	public static PrivateKey chave;

	public static String gerarToken(String texto) throws Exception {
		String token = "";
		if (chave == null) {
			KeyPairGenerator keyGenerator = KeyPairGenerator.getInstance("RSA");
			KeyPair kp = keyGenerator.genKeyPair();
			chave = kp.getPrivate();
		}
		token = Jwts.builder().setSubject(texto).setIssuer("localhost:8090").setIssuedAt(new Date())
				.setExpiration(
						Date.from(LocalDateTime.now().plusMinutes(60L).atZone(ZoneId.systemDefault()).toInstant()))
				.signWith(chave, SignatureAlgorithm.RS256).compact();
		return token;
	}

	public static HashMap<String, Object> jsonFromHashMapString(String json) {
		Gson gson = new Gson();
		return gson.fromJson(json, new TypeToken<HashMap<String, String>>() {
		}.getType());
	}

	public static UsernamePasswordAuthenticationToken getUsuarioSenhaToken(String token) throws Exception {
		String userSenha = "";
		if (!token.equals("")) {
			try {
				java.util.Base64.Decoder decoder = java.util.Base64.getDecoder();
				String[] chunks = token.split("\\.");
				String header = new String(decoder.decode(chunks[1]));
				HashMap<String, Object> retorno = Util.jsonFromHashMapString(header);
				userSenha = retorno.get("sub").toString();
				String dataExpiracao = retorno.get("exp").toString();
				LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochSecond(Long.valueOf(dataExpiracao)),
						ZoneId.systemDefault());
				Jwts.parserBuilder().setSigningKey(Util.chave).build().parseClaimsJws(token);
				if (date.isBefore(LocalDateTime.now()) && !userSenha.equals("")) {
					UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(userSenha, null,
							new ArrayList<>());
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

	public static String toJson(Object obj) {
		Gson gson = new Gson();
		return gson.toJson(obj);
	}

}
