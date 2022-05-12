package com.ssafy.metart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Configuration
public class Web3jConfig {

    private static final String NODE_URL = "https://rinkeby.infura.io/v3/2bbbc01efd2f420f9dbb87b5bdc75680";

    @Bean
    public Web3j web3j() {
        return Web3j.build(new HttpService(NODE_URL));
    }
}
