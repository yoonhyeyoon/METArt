package com.ssafy.metart.api.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ArtUpdateReq {
    @NotNull(message = "ownerAddress 는 필수 값입니다.")
    private String ownerAddress;
    @NotNull(message = "description 는 필수 값입니다.")
    private String description;
}
