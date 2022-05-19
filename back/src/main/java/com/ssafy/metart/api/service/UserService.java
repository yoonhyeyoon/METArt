package com.ssafy.metart.api.service;

import com.ssafy.metart.api.request.UserSaveReq;
import com.ssafy.metart.api.request.UserUpdateReq;
import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.User;
import com.ssafy.metart.db.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AmazonS3Service amazonS3Service;

    @Transactional(readOnly = true)
    public Page<User> pageUser(Pageable pageable, String name) {
        Page<User> userList = userRepository.pageByName(pageable, name);
        return userList;
    }

    @Transactional
    public User saveUser(UserSaveReq req) {
        Optional<User> byAddress = userRepository.findByAddress(req.getAddress());
        if (!byAddress.isEmpty()) {
            throw new ApiException(ExceptionEnum.USER_CONFLICT);
        }

        User user = new User(req.getAddress());
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUser(String address) {
        User user = userRepository.findByAddress(address)
            .orElseThrow(() -> new ApiException(ExceptionEnum.USER_NOT_FOUND));
        return user;
    }

    @Transactional
    public User updateUser(String address, UserUpdateReq req) {
        User user = userRepository.findByAddress(address)
            .orElseThrow(() -> new ApiException(ExceptionEnum.USER_NOT_FOUND));

        String profileUrl = user.getProfileUrl();
        if (req.getProfileImgFile() != null) {
            profileUrl = amazonS3Service.uploadFile(req.getProfileImgFile());
        }

        user.updateUser(req.getName(), req.getBiography(), profileUrl);
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> listPopularGallery() {
        List<User> popularGalleries = userRepository.listPopularGallery();
        return popularGalleries;
    }
}
