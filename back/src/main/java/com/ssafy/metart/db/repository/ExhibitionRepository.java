package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Exhibition;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExhibitionRepository extends JpaRepository<Exhibition, Long> {
//    Optional<Exhibition> findById(Long exhibitionId);
}
