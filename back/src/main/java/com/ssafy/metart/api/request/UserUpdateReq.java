package com.ssafy.metart.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserUpdateReq {
    private String name;
    private String biography;
    private MultipartFile profileImgFile;
}
