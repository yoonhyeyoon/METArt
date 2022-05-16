package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.request.ArtSaveReq;
import com.ssafy.metart.api.request.ArtUpdateReq;
import com.ssafy.metart.api.response.ArtGetRes;
import com.ssafy.metart.api.response.ArtListRes;
import com.ssafy.metart.api.service.ArtService;
import com.ssafy.metart.api.event.CreateTokenEvent;
import com.ssafy.metart.db.entity.Art;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;

@RestController
@RequestMapping("/v1/art")
@RequiredArgsConstructor
public class ArtController {

    private final ArtService artService;
    private final Web3j web3j;

    @GetMapping
    public ResponseEntity<Page<ArtListRes>> pageArt(
        @PageableDefault(size = 12 ,sort = "createdAt", direction = Direction.DESC) Pageable pageable,
        @RequestParam(defaultValue = "") String name,
        @RequestParam(defaultValue = "") String creatorName,
        @RequestParam(defaultValue = "true") Boolean onSaleYn
    ) {
        Page<Art> artList = artService.pageArt(pageable, name, creatorName, onSaleYn);
        Page<ArtListRes> resList = artList.map(art -> ArtListRes.of(art));

        return ResponseEntity.ok(resList);
    }

    @PostMapping
    public ResponseEntity<ArtGetRes> saveArt(
        @Valid @RequestBody ArtSaveReq req
    ) throws TransactionException, IOException {
        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3j, 1000, 600);

        TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(req.getTx());

        CreateTokenEvent event = CreateTokenEvent.getEvent(receipt.getLogs());

        Art art = artService.saveArt(req, event);
        ArtGetRes res = ArtGetRes.of(art);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{tokenId}")
    public ResponseEntity<ArtGetRes> getArt(@PathVariable Long tokenId) {
        Art art = artService.getArt(tokenId);
        ArtGetRes res = ArtGetRes.of(art);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{tokenId}")
    public ResponseEntity<ArtGetRes> updateArt(
        @PathVariable Long tokenId,
        @Valid @RequestBody ArtUpdateReq req
    ) {
        Art art = artService.updateArt(tokenId, req);
        ArtGetRes res = ArtGetRes.of(art);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
