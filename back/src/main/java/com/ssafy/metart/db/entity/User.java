package com.ssafy.metart.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.apache.commons.lang3.RandomStringUtils;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "address")
@ToString
public class User {

    @Id
    private String address;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "profile_url", nullable = false)
    private String profileUrl;

    @Column(name = "biography", nullable = false, columnDefinition = "TEXT")
    private String biography;

    @Column(name = "sale_count", nullable = false)
    @ColumnDefault("0")
    private Long saleCount;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "creator")
    private List<Art> artList;

    @OneToMany(mappedBy = "owner")
    private List<Art> ownedArtList;

    public User(String address) {
        this.address = address;
        this.name = RandomStringUtils.random(15, true, true);
        this.profileUrl = "https://kgw012-metart-bucket.s3.ap-northeast-2.amazonaws.com/amugeona.png";
        this.biography = "";
        this.artList = new ArrayList<>();
        this.ownedArtList = new ArrayList<>();
        this.saleCount = 0L;
    }

    public void updateUser(String name, String biography, String profileUrl) {
        this.name = name;
        this.biography = biography;
        this.profileUrl = profileUrl;
    }

    public void plusSaleCount() {
        this.saleCount++;
    }

}
