package com.ssafy.metart.common.exception.enums;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum ExceptionEnum {
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "000", "알 수 없는 오류가 발생했습니다."),
    ACCESS_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "000", "알 수 없는 오류가 발생했습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "000", "알 수 없는 오류가 발생했습니다."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "104", "해당 유저를 찾을 수 없습니다."),
    USER_CONFLICT(HttpStatus.CONFLICT, "109", "이미 가입된 유저입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ExceptionEnum(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
