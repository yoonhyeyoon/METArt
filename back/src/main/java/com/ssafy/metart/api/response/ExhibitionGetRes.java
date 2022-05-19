package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Exhibition;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ExhibitionGetRes {

    private Long id;
    private Long saleId;
    private Long price;
    private Long artId;
    private String name;
    private String tokenURI;
    private String description;
    private LocalDateTime createdAt;
    private String creatorName;

    public static ExhibitionGetRes of(Exhibition exhibition) {
        if (exhibition == null) {
            return null;
        }

        ExhibitionGetRes res = new ExhibitionGetRes();
        res.id = exhibition.getId();
        if (exhibition.getSale() != null) {
            res.saleId = exhibition.getSale().getId();
            res.price = exhibition.getSale().getPrice();
            if (exhibition.getSale().getArt() != null) {
                res.artId = exhibition.getSale().getArt().getId();
                res.name = exhibition.getSale().getArt().getName();
                res.tokenURI = exhibition.getSale().getArt().getTokenURI();
                res.description = exhibition.getSale().getArt().getDescription();
                res.createdAt = exhibition.getSale().getArt().getCreatedAt();
                res.creatorName = exhibition.getSale().getArt().getCreator().getName();
            }
        }

        return res;
    }
}
