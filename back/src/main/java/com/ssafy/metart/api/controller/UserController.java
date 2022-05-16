package com.ssafy.metart.api.controller;

import com.ssafy.metart.api.request.UserSaveReq;
import com.ssafy.metart.api.request.UserUpdateReq;
import com.ssafy.metart.api.response.UserGetRes;
import com.ssafy.metart.api.response.UserListRes;
import com.ssafy.metart.api.service.UserService;
import com.ssafy.metart.db.entity.User;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<Page<UserListRes>> pageUser(
        @PageableDefault(size = 12, sort = "createdAt", direction = Direction.DESC) Pageable pageable,
        @RequestParam(defaultValue = "") String name
    ) {
        Page<User> userList = userService.pageUser(pageable, name);
        Page<UserListRes> resList = userList.map(user -> UserListRes.of(user));

        return ResponseEntity.ok(resList);
    }

    @PostMapping
    public ResponseEntity<UserGetRes> saveUser(@Valid @RequestBody UserSaveReq req) {
        User user = userService.saveUser(req);
        UserGetRes res = UserGetRes.of(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{address}")
    public ResponseEntity<UserGetRes> getUser(@PathVariable String address) {
        User user = userService.getUser(address);
        UserGetRes res = UserGetRes.of(user);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{address}")
    public ResponseEntity<UserGetRes> updateUser(
        @PathVariable String address,
        @Valid @ModelAttribute UserUpdateReq req
    ) {
        User user = userService.updateUser(address, req);
        UserGetRes res = UserGetRes.of(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
