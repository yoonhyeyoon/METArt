package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Art;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ArtCustomRepository {
    public List<Art> pageByNameAndCreatorName(Pageable pageable, String name, String creatorName);
}
