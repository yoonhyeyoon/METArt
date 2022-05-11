package com.ssafy.metart.api.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSaveReq {
    @NotNull(message = "address 는 필수 값입니다.")
    private String address;
}
