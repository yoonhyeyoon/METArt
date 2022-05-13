package com.ssafy.metart.db.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.util.StringUtils;

import static com.ssafy.metart.db.entity.QArt.art;

public class ArtCustomRepositoryImpl extends QuerydslRepositorySupport implements ArtCustomRepository {

    public ArtCustomRepositoryImpl() {
        super(Art.class);
    }

    @Override
    public List<Art> pageByNameAndCreatorName(Pageable pageable, String name, String creatorName) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(containsName(name),
                containsCreatorName(creatorName));

        return query.fetch();
    }

    @Override
    public List<Art> pageByOwner(Pageable pageable, User owner, Boolean onSaleYn) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(art.owner.eq(owner),
                eqOnSaleYn(onSaleYn));

        return query.fetch();
    }

    @Override
    public List<Art> pageByCreatorAndOnSaleYnAndOwned(Pageable pageable, User creator,
        Boolean onSaleYn, Boolean owned) {
        JPQLQuery<Art> query = Objects.requireNonNull(getQuerydsl())
            .applyPagination(pageable, from(art))
            .where(art.creator.eq(creator),
                eqOnSaleYn(onSaleYn),
                checkOwnedArt(creator, owned));

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
