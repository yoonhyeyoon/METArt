package com.ssafy.metart.db.repository;

import com.ssafy.metart.db.entity.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserCustomRepository {
    Page<User> pageByName(Pageable pageable, String name);
    List<User> listPopularGallery();
}
