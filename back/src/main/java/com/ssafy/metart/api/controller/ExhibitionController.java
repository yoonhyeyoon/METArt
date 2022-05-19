package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.request.ExhibitionSaveReq;
import com.ssafy.metart.api.response.ExhibitionGetRes;
import com.ssafy.metart.api.response.SaleGetRes;
import com.ssafy.metart.api.service.ExhibitionService;
import com.ssafy.metart.db.entity.Exhibition;
import com.ssafy.metart.db.entity.Sale;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/exhibition")
@RequiredArgsConstructor
public class ExhibitionController {

    private final ExhibitionService exhibitionService;

    @GetMapping("/info/{exhibitionId}")
    public ResponseEntity<ExhibitionGetRes> getExhibition(@PathVariable Long exhibitionId) {
        Exhibition exhibition = exhibitionService.getExhibition(exhibitionId);
        ExhibitionGetRes res = ExhibitionGetRes.of(exhibition);
        return ResponseEntity.ok(res);
    }

    @PostMapping
    public ResponseEntity<ExhibitionGetRes> saveExhibition(@Valid @RequestBody ExhibitionSaveReq req) {
        Exhibition exhibition = exhibitionService.saveExhibition(req);
        ExhibitionGetRes res = ExhibitionGetRes.of(exhibition);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("")
    public ResponseEntity<List<ExhibitionGetRes>> clear
}
