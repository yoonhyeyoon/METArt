package com.ssafy.metart.db.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import static com.ssafy.metart.db.entity.QUser.user;

public class UserCustomRepositoryImpl extends QuerydslRepositorySupport implements UserCustomRepository {

    public UserCustomRepositoryImpl() {
        super(User.class);
    }

    @Override
    public Page<User> pageByName(Pageable pageable, String name) {
        JPQLQuery<User> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(user))
            .where(containsName(name));

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    private BooleanExpression containsName(String name) {
        if (StringUtils.hasText(name)) {
            return user.name.contains(name);
        }
        return null;
    }
}
