package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.response.ArtListRes;
import com.ssafy.metart.api.response.UserGetRes;
import com.ssafy.metart.api.response.UserListRes;
import com.ssafy.metart.api.service.ArtService;
import com.ssafy.metart.api.service.UserService;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/main")
@RequiredArgsConstructor
public class MainController {

    private final ArtService artService;
    private final UserService userService;

    @GetMapping("/new")
    public ResponseEntity<List<ArtListRes>> listNewArt() {
        List<Art> newArts = artService.listNewArt();
        List<ArtListRes> res = newArts.stream().map(art -> ArtListRes.of(art)).collect(Collectors.toList());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<UserListRes>> listPopularGallery() {
        List<User> popularGalleries = userService.listPopularGallery();
        List<UserListRes> res = popularGalleries.stream().map(user -> UserListRes.of(user)).collect(
            Collectors.toList());
        return ResponseEntity.ok(res);
    }
}
