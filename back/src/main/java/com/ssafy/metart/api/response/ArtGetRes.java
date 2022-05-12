package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Art;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ArtGetRes {

    private Long id;
    private String name;
    private String description;
    private String url;
    private Boolean onSaleYn;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserListRes creator;

    public static ArtGetRes of(Art art) {
        ArtGetRes res = new ArtGetRes();

        res.id = art.getId();
        res.name = art.getName();
        res.description = art.getDescription();
        res.url = art.getUrl();
        res.onSaleYn = art.getOnSaleYn();
        res.createdAt = art.getCreatedAt();
        res.updatedAt = art.getUpdatedAt();
        res.creator = UserListRes.of(art.getCreator());

        return res;
    }
}
