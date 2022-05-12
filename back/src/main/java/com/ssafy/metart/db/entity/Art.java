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

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "on_sale_yn", nullable = false)
    private Boolean onSaleYn;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_address")
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_address")
    private User owner;

    @Builder
    public Art(Long id, String name, String description, String url, User creator) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.onSaleYn = false;
        this.owner = creator;
        this.creator = creator;
    }

    public void updateArtDescription(String description) {
        this.description = description;
    }

    public void startSale() {
        this.onSaleYn = true;
    }

    public void stopSale() {
        this.onSaleYn = false;
    }

    public void transferArt(User newOwner) {
        this.owner = newOwner;
    }
}
