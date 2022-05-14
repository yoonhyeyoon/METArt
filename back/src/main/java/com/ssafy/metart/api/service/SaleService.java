package com.ssafy.metart.api.service;

import com.ssafy.metart.api.event.CreateSaleEvent;
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
    public List<Sale> listSale(Pageable pageable) {
        List<Sale> saleList = saleRepository.findAll(pageable).getContent();
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

        System.out.println(newSale.hashCode());
        System.out.println(sale.hashCode());

        art.startSale();
        artRepository.save(art);

        return newSale;
    }
}
