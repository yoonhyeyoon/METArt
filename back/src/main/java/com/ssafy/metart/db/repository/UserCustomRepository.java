package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.User;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface UserCustomRepository {
    List<User> pageByName(Pageable pageable, String name);
}
