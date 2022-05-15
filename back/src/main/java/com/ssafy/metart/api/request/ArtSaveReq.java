package com.ssafy.metart.api.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArtSaveReq {
    @NotNull(message = "tx 는 필수 값입니다.")
    private String tx;
    @NotNull(message = "name 는 필수 값입니다.")
    private String name;
    @NotNull(message = "description 는 필수 값입니다.")
    private String description;
    @NotNull(message = "url 는 필수 값입니다.")
    private String tokenURI;
}
