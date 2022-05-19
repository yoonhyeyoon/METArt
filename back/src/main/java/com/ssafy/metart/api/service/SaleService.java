package com.ssafy.metart.api.service;

import com.ssafy.metart.api.event.CreateSaleEvent;
import com.ssafy.metart.api.event.EndSaleEvent;
import com.ssafy.metart.api.request.SaleSaveReq;
import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.Sale;
import com.ssafy.metart.db.entity.User;
import com.ssafy.metart.db.repository.ArtRepository;
import com.ssafy.metart.db.repository.SaleRepository;
import com.ssafy.metart.db.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final UserRepository userRepository;
    private final ArtRepository artRepository;

    @Transactional(readOnly = true)
    public Page<Sale> pageSale(Pageable pageable) {
        Page<Sale> saleList = saleRepository.findAll(pageable);
        return saleList;
    }

    @Transactional
    public Sale saveSale(SaleSaveReq req, CreateSaleEvent event) {
        User seller = userRepository.findByAddress(event.getSellerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.USER_NOT_FOUND));
        Art art = artRepository.findById(req.getTokenId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.ART_NOT_FOUND));
        if (art.getOwner() != seller) {
            throw new ApiException(ExceptionEnum.ART_UNAUTHORIZED);
        }

        Sale sale = Sale.builder()
            .id(event.getSaleId())
            .price(event.getPrice())
            .art(art)
            .seller(seller)
            .build();
        Sale newSale = saleRepository.save(sale);

        art.startSale(newSale);
        artRepository.save(art);

        return newSale;
    }

    @Transactional(readOnly = true)
    public Sale getSale(Long saleId) {
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.SALE_NOT_FOUND));
        return sale;
    }

    @Transactional
    public Sale cancelSale(Long saleId, EndSaleEvent event) {
        if (saleId != event.getSaleId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_EXCEPTION);
        }

        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.SALE_NOT_FOUND));

        if (!sale.getSeller().getAddress().equalsIgnoreCase(event.getSellerAddress())) {
            throw new ApiException(ExceptionEnum.SALE_UNAUTHORIZED);
        }

        if (sale.getSaleYn() || sale.getIsCanceled()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_EXCEPTION);
        }

        sale.getArt().stopSale();
        sale.cancelSale();
        return saleRepository.save(sale);
    }

    @Transactional
    public Sale purchase(Long saleId, EndSaleEvent event) {
        if (saleId != event.getSaleId()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_EXCEPTION);
        }

        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.SALE_NOT_FOUND));

        if (!sale.getSeller().getAddress().equalsIgnoreCase(event.getSellerAddress())) {
            throw new ApiException(ExceptionEnum.SALE_UNAUTHORIZED);
        }

        if (sale.getSaleYn() || sale.getIsCanceled()) {
            throw new ApiException(ExceptionEnum.BAD_REQUEST_EXCEPTION);
        }

        User buyer = userRepository.findByAddress(event.getBuyerAddress())
            .orElseThrow(() -> new ApiException(ExceptionEnum.USER_NOT_FOUND));

        if (sale.getSeller() == buyer) {
            throw new ApiException(ExceptionEnum.SALE_CONFLICT);
        }

        sale.getArt().getCreator().plusSaleCount();
        sale.getArt().transferArt(buyer);
        sale.getArt().stopSale();
        sale.purchase(buyer);
        return saleRepository.save(sale);
    }
}
