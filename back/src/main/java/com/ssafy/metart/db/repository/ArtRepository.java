package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.Art;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtRepository extends JpaRepository<Art, Long>, ArtCustomRepository {

}
