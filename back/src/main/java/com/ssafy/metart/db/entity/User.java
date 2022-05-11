package com.ssafy.metart.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
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
public class User {

    @Id
    @Column(
        name = "address",
        nullable = false,
        unique = true
    )
    private String address;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "profile_url", nullable = false)
    private String profileUrl;

    @Column(name = "biography", nullable = false, columnDefinition = "TEXT")
    private String biography;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public User(String address) {
        this.address = address;
        this.name = address;
        this.profileUrl = "";
        this.biography = "";
    }

    public void updateUser(String name, String biography, String profileUrl) {
        this.name = name;
        this.biography = biography;
        this.profileUrl = profileUrl;
    }

}
