package com.ssafy.metart.api.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExhibitionSaveReq {
    @NotNull(message = "id 는 필수 값입니다.")
    private Long id;
    @NotNull(message = "saleId 는 필수 값입니다.")
    private Long saleId;
}
