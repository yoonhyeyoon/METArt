package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.service.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/image")
@RequiredArgsConstructor
public class ImageController {

    private final AmazonS3Service amazonS3Service;

    @PostMapping
    public ResponseEntity<String> saveImage(@RequestPart MultipartFile imageFile) {
        String url = amazonS3Service.uploadFile(imageFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(url);
    }
}
