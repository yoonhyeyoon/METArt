package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String>, UserCustomRepository {
    Optional<User> findByAddress(String address);
}
