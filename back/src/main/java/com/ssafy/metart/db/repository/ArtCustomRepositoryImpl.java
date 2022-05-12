package com.ssafy.metart.db.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.metart.db.entity.Art;
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
}
