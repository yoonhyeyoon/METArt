package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Art;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ArtListRes {

    private Long id;
    private String name;
    private String tokenURI;
    private Boolean onSaleYn;
    private UserListRes creator;
    private UserListRes owner;
    private SaleGetResNotArt sale;

    public static ArtListRes of(Art art) {
        if (art == null) {
            return null;
        }
        ArtListRes res = new ArtListRes();

        res.id = art.getId();
        res.name = art.getName();
        res.tokenURI = art.getTokenURI();
        res.onSaleYn = art.getOnSaleYn();
        res.creator = UserListRes.of(art.getCreator());
        res.owner = UserListRes.of(art.getOwner());
        res.sale = SaleGetResNotArt.of(art.getSale());

        return res;
    }
}
