package com.ssafy.metart.api.service;

import com.ssafy.metart.api.request.ExhibitionSaveReq;
import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.Exhibition;
import com.ssafy.metart.db.entity.Sale;
import com.ssafy.metart.db.repository.ExhibitionRepository;
import com.ssafy.metart.db.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;
    private final SaleRepository saleRepository;

    @Transactional(readOnly = true)
    public Exhibition getExhibition(Long exhibitionId) {
        Exhibition exhibition = exhibitionRepository.findById(exhibitionId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.EXHIBITION_NOT_FOUND));

        return exhibition;
    }

    @Transactional
    public Exhibition saveExhibition(ExhibitionSaveReq req) {
        Sale sale = saleRepository.findById(req.getSaleId())
            .orElseThrow(() -> new ApiException(ExceptionEnum.SALE_NOT_FOUND));

        if (exhibitionRepository.findById(req.getId()).isPresent()) {
            throw new ApiException(ExceptionEnum.EXHIBITION_CONFLICT);
        }

        Exhibition exhibition = Exhibition.builder()
            .id(req.getId())
            .sale(sale)
            .build();

        return exhibitionRepository.save(exhibition);
    }
}
