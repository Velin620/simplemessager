package it.perigea.simplemessager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("it.perigea.simplemessager.dao")
@EntityScan("it.perigea.simplemessager.entity")
@SpringBootApplication
public class SimplemessagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimplemessagerApplication.class, args);
	}

}
