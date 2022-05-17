package com.ssafy.metart.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@ToString
public class Sale {

    @Id
    private Long id;

    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "sale_yn", nullable = false)
    private Boolean saleYn;

    @Column(name = "is_canceled", nullable = false)
    private Boolean isCanceled;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "completed_at", nullable = true)
    private LocalDateTime completedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "art_id", nullable = false)
    private Art art;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_address", nullable = false)
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_address", nullable = true)
    private User buyer;

    @Builder
    public Sale(Long id, Long price, Art art, User seller) {
        this.id = id;
        this.price = price;
        this.saleYn = false;
        this.art = art;
        this.seller = seller;
        this.isCanceled = false;
    }

    public void purchase(User buyer) {
        this.saleYn = true;
        this.buyer = buyer;
        this.completedAt = LocalDateTime.now();
    }

    public void cancelSale() {
        this.isCanceled = true;
        this.completedAt = LocalDateTime.now();
    }
}
