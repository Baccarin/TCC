package br.com.ucpel.tcc.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesLoader {
	
	private Properties props;
	private String nomeDoProperties = "/application.properties";

	public PropertiesLoader() {
		props = new Properties();
		InputStream in = getClass().getResourceAsStream(nomeDoProperties);
		try {
			props.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getValor(String chave) {
		return (String) props.getProperty(chave);
	}
}