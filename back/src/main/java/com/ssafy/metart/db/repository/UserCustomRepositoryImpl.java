package com.ssafy.metart.db.repository;

import com.querydsl.jpa.JPQLQuery;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.util.StringUtils;

import static com.ssafy.metart.db.entity.QUser.user;

public class UserCustomRepositoryImpl extends QuerydslRepositorySupport implements UserCustomRepository {

    public UserCustomRepositoryImpl() { super(User.class); }

    @Override
    public List<User> pageByName(Pageable pageable, String name) {
        JPQLQuery<User> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(user));

        if (StringUtils.hasText(name)) {
            query.where(user.name.contains(name));
        }

        return query.fetch();
    }
}
