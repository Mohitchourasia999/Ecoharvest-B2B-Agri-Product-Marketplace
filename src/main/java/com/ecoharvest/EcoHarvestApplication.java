package com.ecoharvest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Purpose: Main entry point of the Spring Boot application.
 * @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, @ComponentScan.
 * It tells Spring Boot to auto-configure and scan for components in this package.
 */
@SpringBootApplication
public class EcoHarvestApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoHarvestApplication.class, args);
    }
}
