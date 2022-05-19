package com.ssafy.metart.api.service;

import com.ssafy.metart.api.request.ExhibitionSaveReq;
import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.Exhibition;
import com.ssafy.metart.db.entity.Sale;
import com.ssafy.metart.db.repository.ExhibitionRepository;
import com.ssafy.metart.db.repository.SaleRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExhibitionService {

    private final ExhibitionRepository exhibitionRepository;
    private final SaleRepository saleRepository;

    @Transactional(readOnly = true)
    public List<Exhibition> listExhibition() {
        List<Exhibition> exhibitionList = exhibitionRepository.findAllByOrderByIdAsc();
        return exhibitionList;
    }

    @Transactional(readOnly = true)
    public Exhibition getExhibition(Long exhibitionId) {
        Exhibition exhibition = exhibitionRepository.findById(exhibitionId)
            .orElseThrow(() -> new ApiException(ExceptionEnum.EXHIBITION_NOT_FOUND));

        if (exhibition.getSale() == null) {
            throw new ApiException(ExceptionEnum.EXHIBITION_NOT_FOUND2);
        }
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

    @Transactional
    public List<Exhibition> clearExhibition() {
        List<Exhibition> exhibitionList = new ArrayList<>();

        for (long i = 1L; i <= 53; i++) {
            Exhibition exhibition = Exhibition.builder()
                .id(i)
                .sale(null)
                .build();
            exhibitionList.add(exhibition);
        }

        return exhibitionRepository.saveAll(exhibitionList);
    }

    @Transactional
    public List<Exhibition> setExhibition() {
        List<Exhibition> exhibitionList = new ArrayList<>();
        List<Sale> saleList = saleRepository.findAllBySaleYnAndIsCanceledOrderByCreatedAtDesc(false, false);

        for (int i = 1; i <= 53; i++) {
            Sale sale = null;
            if (i <= saleList.size()) {
                sale = saleList.get(i - 1);
            }

            Exhibition exhibition = Exhibition.builder()
                .id((long)i)
                .sale(sale)
                .build();
            exhibitionList.add(exhibition);
        }

        return exhibitionRepository.saveAll(exhibitionList);
    }

}
