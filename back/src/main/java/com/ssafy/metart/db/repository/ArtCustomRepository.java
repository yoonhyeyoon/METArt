package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArtCustomRepository {
    Page<Art> pageByNameAndCreatorName(Pageable pageable, String name, String creatorName);
    Page<Art> pageByOwner(Pageable pageable, User owner, Boolean onSaleYn);
    Page<Art> pageByCreatorAndOnSaleYnAndOwned(Pageable pageable, User creator, Boolean onSaleYn, Boolean owned);
}
