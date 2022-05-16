package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Art;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ArtGetRes {

    private Long id;
    private String name;
    private String description;
    private String tokenURI;
    private Boolean onSaleYn;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserListRes creator;
    private UserListRes owner;
    private SaleGetResNotArt sale;

    public static ArtGetRes of(Art art) {
        if (art == null) {
            return null;
        }
        ArtGetRes res = new ArtGetRes();

        res.id = art.getId();
        res.name = art.getName();
        res.description = art.getDescription();
        res.tokenURI = art.getTokenURI();
        res.onSaleYn = art.getOnSaleYn();
        res.createdAt = art.getCreatedAt();
        res.updatedAt = art.getUpdatedAt();
        res.creator = UserListRes.of(art.getCreator());
        res.owner = UserListRes.of(art.getOwner());
        res.sale = SaleGetResNotArt.of(art.getSale());

        return res;
    }
}
