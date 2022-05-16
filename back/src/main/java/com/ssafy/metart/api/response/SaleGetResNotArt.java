package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.Sale;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SaleGetResNotArt {

    private Long id;
    private Long price;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private UserListRes seller;
    private UserListRes buyer;

    public static SaleGetResNotArt of(Sale sale) {
        if (sale == null) {
            return null;
        }

        SaleGetResNotArt res = new SaleGetResNotArt();

        res.id = sale.getId();
        res.price = sale.getPrice();
        res.createdAt = sale.getCreatedAt();
        res.completedAt = sale.getCompletedAt();
        res.seller = UserListRes.of(sale.getSeller());
        if (sale.getBuyer() != null) {
            res.buyer = UserListRes.of(sale.getBuyer());
        }

        return res;
    }
}
