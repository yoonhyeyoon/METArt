package com.ssafy.metart.config;

import com.fasterxml.classmate.TypeResolver;
import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    TypeResolver typeResolver = new TypeResolver();

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
            .alternateTypeRules(
                AlternateTypeRules.newRule(
                    typeResolver.resolve(Pageable.class), typeResolver.resolve(BasePageReq.class)))
            .groupName("6to0")
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build();

    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("METArt Rest API")
            .description("<h3>METArt Rest API 문서</h3>")
            .contact(new Contact("METArt", "https://j6d107.p.ssafy.io", "js.pekah@gmail.com"))
            .license("MIT License")
            .version("1.0")
            .build();
    }

    @Data
    @JsonNaming(value = SnakeCaseStrategy.class)
    private static class BasePageReq {
        @ApiModelProperty(value = "페이지 번호")
        private Integer page;

        @ApiModelProperty(value = "페이지 크기")
        private Integer size;
    }

}
