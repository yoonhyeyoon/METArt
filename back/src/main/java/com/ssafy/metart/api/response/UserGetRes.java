package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserGetRes {

    private String address;
    private String name;
    private String biography;
    private String profileUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserGetRes of(User user) {
        if (user == null) {
            return null;
        }
        UserGetRes res = new UserGetRes();

        res.address = user.getAddress();
        res.name = user.getName();
        res.biography = user.getBiography();
        res.profileUrl = user.getProfileUrl();
        res.createdAt = user.getCreatedAt();
        res.updatedAt = user.getUpdatedAt();

        return res;
    }
}
