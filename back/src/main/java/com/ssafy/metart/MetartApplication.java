package com.ssafy.metart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@PropertySources({
	@PropertySource("classpath:secrets/mysql.properties")
})
public class MetartApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetartApplication.class, args);
	}

}
