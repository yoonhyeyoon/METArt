package com.ssafy.metart.db.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import static com.ssafy.metart.db.entity.QArt.art;

public class ArtCustomRepositoryImpl extends QuerydslRepositorySupport implements ArtCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    public ArtCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Art.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public Page<Art> pageByNameAndCreatorNameAndOnSaleYn(Pageable pageable, String name, String creatorName, Boolean onSaleYn) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(containsName(name),
                containsCreatorName(creatorName),
                eqOnSaleYn(onSaleYn));

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    @Override
    public Page<Art> pageByOwner(Pageable pageable, User owner, Boolean onSaleYn) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(art.owner.eq(owner),
                eqOnSaleYn(onSaleYn));

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    @Override
    public Page<Art> pageByCreatorAndOnSaleYnAndOwned(Pageable pageable, User creator,
        Boolean onSaleYn, Boolean owned) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(art.creator.eq(creator),
                eqOnSaleYn(onSaleYn),
                checkOwnedArt(creator, owned));

        return PageableExecutionUtils.getPage(query.fetch(), pageable, query::fetchCount);
    }

    @Override
    public List<Art> listNewArt() {
        JPAQuery<Art> query = jpaQueryFactory
            .selectFrom(art)
            .where(art.onSaleYn.eq(true))
            .orderBy(art.sale.createdAt.desc())
            .limit(4);
        return query.fetch();
    }


    private BooleanExpression containsName(String name) {
        if (StringUtils.hasText(name)) {
            return art.name.contains(name);
        }
        return null;
    }

    private BooleanExpression containsCreatorName(String creatorName) {
        if (StringUtils.hasText(creatorName)) {
            return art.creator.name.contains(creatorName);
        }
        return null;
    }

    private BooleanExpression eqOnSaleYn(Boolean onSaleYn) {
        if (onSaleYn != null) {
            return art.onSaleYn.eq(onSaleYn);
        }
        return null;
    }

    private BooleanExpression checkOwnedArt(User creator, Boolean owned) {
        if (owned == null) {
            return null;
        } else if (owned) {
            return art.owner.eq(creator);
        } else {
            return art.owner.ne(creator);
        }
    }
}
