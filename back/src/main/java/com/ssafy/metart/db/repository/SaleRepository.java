package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Sale;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    Page<Sale> findAll(Pageable pageable);
    List<Sale> findAllBySaleYnAndIsCanceledOrderByCreatedAtDesc(Boolean saleYn, Boolean isCanceled);
}
