package com.ssafy.metart.api.response;

import com.ssafy.metart.db.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserListRes {

    private String address;
    private String name;
    private String profileUrl;

    public static UserListRes of(User user) {
        if (user == null) {
            return null;
        }
        UserListRes res = new UserListRes();

        res.address = user.getAddress();
        res.name = user.getName();
        res.profileUrl = user.getProfileUrl();

        return res;
    }
}
