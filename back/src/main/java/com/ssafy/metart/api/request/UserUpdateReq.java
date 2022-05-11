package com.ssafy.metart.api.request;

import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserUpdateReq {
    @NotNull(message = "name 은 필수 값입니다.")
    private String name;
    @NotNull(message = "biography 는 필수 값입니다.")
    private String biography;
    private MultipartFile profileImgFile;
}
