package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Sale;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SaleGetRes {

    private Long id;
    private Long price;
    private Boolean saleYn;
    private Boolean isCanceled;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private ArtListResNotSale art;
    private UserListRes seller;
    private UserListRes buyer;

    public static SaleGetRes of(Sale sale) {
        if (sale == null) {
            return null;
        }

        SaleGetRes res = new SaleGetRes();

        res.id = sale.getId();
        res.price = sale.getPrice();
        res.saleYn = sale.getSaleYn();
        res.isCanceled = sale.getIsCanceled();
        res.createdAt = sale.getCreatedAt();
        res.completedAt = sale.getCompletedAt();
        res.art = ArtListResNotSale.of(sale.getArt());
        res.seller = UserListRes.of(sale.getSeller());
        if (sale.getBuyer() != null) {
            res.buyer = UserListRes.of(sale.getBuyer());
        }

        return res;
    }
}
