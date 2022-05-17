package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Exhibition;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExhibitionGetRes {

    private Long id;
    private Long saleId;

    public static ExhibitionGetRes of(Exhibition exhibition) {
        if (exhibition == null) {
            return null;
        }

        ExhibitionGetRes res = new ExhibitionGetRes();
        res.id = exhibition.getId();
        if (exhibition.getSale() != null) {
            res.saleId = exhibition.getSale().getId();
        }

        return res;
    }
}
