package com.ssafy.metart.common.exception.enums;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum ExceptionEnum {
    BAD_REQUEST_EXCEPTION(HttpStatus.BAD_REQUEST, "000", "잘못된 요청입니다."),
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "001", "알 수 없는 오류가 발생했습니다."),
    ACCESS_DENIED_EXCEPTION(HttpStatus.UNAUTHORIZED, "002", "인증되지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "003", "알 수 없는 오류가 발생했습니다."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "104", "해당 유저를 찾을 수 없습니다."),
    USER_CONFLICT(HttpStatus.CONFLICT, "109", "이미 가입된 유저입니다."),

    ART_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "201", "작품에 대한 권한이 없습니다."),
    ART_NOT_FOUND(HttpStatus.NOT_FOUND, "204", "해당 작품을 찾을 수 없습니다."),

    SALE_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "301", "해당 판매에 대한 권한이 없습니다."),
    SALE_NOT_FOUND(HttpStatus.NOT_FOUND, "304", "해당 판매 정보를 찾을 수 없습니다."),
    SALE_CONFLICT(HttpStatus.CONFLICT, "309", "판매자는 구매할 수 없습니다."),

    EXHIBITION_NOT_FOUND(HttpStatus.NOT_FOUND, "404", "해당 전시를 찾을 수 없습니다."),
    EXHIBITION_NOT_FOUND2(HttpStatus.NOT_FOUND, "404", "해당 전시 id에 연결된 sale이 없습니다."),
    EXHIBITION_CONFLICT(HttpStatus.CONFLICT, "409", "이미 있는 전시 id입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ExceptionEnum(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
