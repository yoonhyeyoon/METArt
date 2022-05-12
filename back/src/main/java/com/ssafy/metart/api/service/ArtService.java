package com.ssafy.metart.api.service;

import com.ssafy.metart.api.event.CreateTokenEvent;
import com.ssafy.metart.api.request.ArtSaveReq;
import com.ssafy.metart.common.exception.ApiException;
import com.ssafy.metart.common.exception.enums.ExceptionEnum;
import com.ssafy.metart.db.entity.Art;
import com.ssafy.metart.db.entity.User;
import com.ssafy.metart.db.repository.ArtRepository;
import com.ssafy.metart.db.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ArtRepository artRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Art> listArt(Pageable pageable, String name, String creatorName) {
        List<Art> artList = artRepository.pageByNameAndCreatorName(pageable, name, creatorName);
        return artList;
    }

    @Transactional
    public Art saveArt(ArtSaveReq req, CreateTokenEvent event) {
        User creator = userRepository.findByAddress(event.getOwner())
            .orElseThrow(() -> new ApiException(ExceptionEnum.USER_NOT_FOUND));

        Art art = Art.builder()
            .id(event.getTokenId())
            .name(req.getName())
            .description(req.getDescription())
            .tokenURI(req.getTokenURI())
            .creator(creator)
            .build();

        return artRepository.save(art);
    }
}
