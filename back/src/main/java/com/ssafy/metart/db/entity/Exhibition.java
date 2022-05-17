package com.ssafy.metart.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@ToString
public class Exhibition {

    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "sale_id", nullable = true)
    private Sale sale;

    @Builder
    public Exhibition(Long id, Sale sale) {
        this.id = id;
        this.sale = sale;
    }
}
