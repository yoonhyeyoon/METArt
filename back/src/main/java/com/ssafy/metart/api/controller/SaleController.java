package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.event.CreateSaleEvent;
import com.ssafy.metart.api.event.EndSaleEvent;
import com.ssafy.metart.api.request.SaleSaveReq;
import com.ssafy.metart.api.request.TxHashReq;
import com.ssafy.metart.api.response.SaleGetRes;
import com.ssafy.metart.api.service.SaleService;
import com.ssafy.metart.db.entity.Sale;
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
import org.springframework.web.bind.annotation.RestController;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;

@RestController
@RequestMapping("/v1/sale")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;
    private final Web3j web3j;

    @GetMapping
    public ResponseEntity<Page<SaleGetRes>> listSale(
        @PageableDefault(size = 12 ,sort = "createdAt", direction = Direction.DESC) Pageable pageable
    ) {
        Page<Sale> saleList = saleService.pageSale(pageable);
        Page<SaleGetRes> resList = saleList.map(sale -> SaleGetRes.of(sale));

        return ResponseEntity.ok(resList);
    }

    @PostMapping
    public ResponseEntity<SaleGetRes> saveSale(@Valid @RequestBody SaleSaveReq req)
        throws TransactionException, IOException {
        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3j, 1000, 600);

        TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(req.getTx());

        CreateSaleEvent event = CreateSaleEvent.getEvent(receipt.getLogs());

        Sale sale = saleService.saveSale(req, event);
        SaleGetRes res = SaleGetRes.of(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<SaleGetRes> getSale(@PathVariable Long saleId) {
        Sale sale = saleService.getSale(saleId);
        SaleGetRes res = SaleGetRes.of(sale);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{saleId}/cancel")
    public ResponseEntity<SaleGetRes> cancelSale(
        @PathVariable Long saleId, @Valid @RequestBody TxHashReq req
    ) throws TransactionException, IOException {
        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3j, 1000, 600);

        TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(req.getTx());

        EndSaleEvent event = EndSaleEvent.getEvent(receipt.getLogs());

        Sale sale = saleService.cancelSale(saleId, event);
        SaleGetRes res = SaleGetRes.of(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PutMapping("/{saleId}/purchase")
    public ResponseEntity<SaleGetRes> purchase(
        @PathVariable Long saleId, @Valid @RequestBody TxHashReq req
    ) throws TransactionException, IOException {
        TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(web3j, 1000, 600);

        TransactionReceipt receipt = receiptProcessor.waitForTransactionReceipt(req.getTx());

        EndSaleEvent event = EndSaleEvent.getEvent(receipt.getLogs());

        Sale sale = saleService.purchase(saleId, event);
        SaleGetRes res = SaleGetRes.of(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
