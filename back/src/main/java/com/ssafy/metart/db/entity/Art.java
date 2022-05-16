package com.ssafy.metart.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@ToString
public class Art {

    @Id
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "tokenURI", nullable = false)
    private String tokenURI;

    @Column(name = "on_sale_yn", nullable = false)
    private Boolean onSaleYn;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_address", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_address", nullable = false)
    private User owner;

    @OneToOne
    @JoinColumn(name = "sale_id", nullable = true)
    private Sale sale;

    @Builder
    public Art(Long id, String name, String description, String tokenURI, User creator) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tokenURI = tokenURI;
        this.onSaleYn = false;
        this.owner = creator;
        this.creator = creator;
    }

    public void updateArtDescription(String description) {
        this.description = description;
    }

    public void startSale(Sale sale) {
        this.onSaleYn = true;
        this.sale = sale;
    }

    public void stopSale() {
        this.onSaleYn = false;
        this.sale = null;
    }

    public void transferArt(User newOwner) {
        this.owner = newOwner;
    }
}
