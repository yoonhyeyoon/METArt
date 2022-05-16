package com.ssafy.metart.api.service;

import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import com.ssafy.metart.db.repository.ArtRepository;
import com.ssafy.metart.db.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserArtService {

    private final UserRepository userRepository;
    private final ArtRepository artRepository;

    public Page<Art> pageMyArt(Pageable pageable, String address, Boolean onSaleYn) {
        User owner = userRepository.findByAddress(address).orElseThrow(
            () -> new ApiException(ExceptionEnum.USER_NOT_FOUND));

        Page<Art> artList = artRepository.pageByOwner(pageable, owner, onSaleYn);

        return artList;
    }

    public Page<Art> pageMyCreateArt(
        Pageable pageable, String address, Boolean onSaleYn, Boolean owned
    ) {
        User creator = userRepository.findByAddress(address).orElseThrow(
            () -> new ApiException(ExceptionEnum.USER_NOT_FOUND));

        Page<Art> artList = artRepository.pageByCreatorAndOnSaleYnAndOwned(
            pageable, creator, onSaleYn, owned);

        return artList;
    }
}
