package com.ssafy.metart.common.exception.handler;

import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.common.exception.entity.ApiExceptionEntity;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {
    @ExceptionHandler({ApiException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final ApiException e) {
        return ResponseEntity
            .status(e.getError().getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(e.getError().getCode())
                .errorMessage(e.getError().getMessage())
                .build());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final MethodArgumentNotValidException e) {
        return ResponseEntity
            .status(ExceptionEnum.BAD_REQUEST_EXCEPTION.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.BAD_REQUEST_EXCEPTION.getCode())
                .errorMessage(e.getFieldErrors().get(0).getDefaultMessage())
                .build());
    }

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final RuntimeException e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.RUNTIME_EXCEPTION.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.RUNTIME_EXCEPTION.getCode())
                .errorMessage(e.getMessage())
                .build());
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final AccessDeniedException e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getCode())
                .errorMessage(e.getMessage())
                .build());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiExceptionEntity> exceptionHandler(HttpServletRequest request, final Exception e) {
        e.printStackTrace();
        return ResponseEntity
            .status(ExceptionEnum.INTERNAL_SERVER_ERROR.getStatus())
            .body(ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.INTERNAL_SERVER_ERROR.getCode())
                .errorMessage(e.getMessage())
                .build());
    }
}