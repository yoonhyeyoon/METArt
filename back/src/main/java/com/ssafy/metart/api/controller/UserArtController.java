package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.response.ArtListRes;
import com.ssafy.metart.api.service.UserArtService;
import com.ssafy.metart.db.entity.Art;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
@RequiredArgsConstructor
public class UserArtController {

    private final UserArtService userArtService;

    @GetMapping("/{address}/arts")
    public ResponseEntity<List<ArtListRes>> listMyCreateArt(
        @PageableDefault(size = 12 ,sort = "createdAt", direction = Direction.DESC) Pageable pageable,
        @PathVariable String address,
        @RequestParam(required = false) Boolean onSaleYn,
        @RequestParam(required = false) Boolean owned
    ){
        List<Art> artList = userArtService.listMyCreateArt(pageable, address, onSaleYn, owned);
        List<ArtListRes> resList = artList.stream().map(
            art -> ArtListRes.of(art)).collect(Collectors.toList());

        return ResponseEntity.ok(resList);
    }
}
