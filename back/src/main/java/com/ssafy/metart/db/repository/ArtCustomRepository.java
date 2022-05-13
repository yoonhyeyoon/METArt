package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ArtCustomRepository {
    List<Art> pageByNameAndCreatorName(Pageable pageable, String name, String creatorName);
    List<Art> pageByOwner(Pageable pageable, User owner, Boolean onSaleYn);
    List<Art> pageByCreatorAndOnSaleYnAndOwned(Pageable pageable, User creator, Boolean onSaleYn, Boolean owned);
}
