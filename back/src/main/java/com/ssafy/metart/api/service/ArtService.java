package com.ssafy.metart.api.service;

import com.ssafy.metart.api.event.CreateTokenEvent;
import com.ssafy.metart.api.request.ArtSaveReq;
import com.ssafy.metart.api.request.ArtUpdateReq;
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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArtService {

    private final ArtRepository artRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<Art> pageArt(Pageable pageable, String name, String creatorName, Boolean onSaleYn) {
        Page<Art> artList = artRepository.pageByNameAndCreatorNameAndOnSaleYn(pageable, name, creatorName, onSaleYn);
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

    @Transactional(readOnly = true)
    public Art getArt(Long tokenId) {
        Art art = artRepository.findById(tokenId).orElseThrow(
            () -> new ApiException(ExceptionEnum.ART_NOT_FOUND));
        return art;
    }

    @Transactional
    public Art updateArt(Long tokenId, ArtUpdateReq req) {
        Art art = artRepository.findById(tokenId).orElseThrow(
            () -> new ApiException(ExceptionEnum.ART_NOT_FOUND));
        User owner = userRepository.findByAddress(req.getOwnerAddress()).orElseThrow(
            () -> new ApiException(ExceptionEnum.USER_NOT_FOUND));
        if (art.getOwner() != owner) {
            throw new ApiException(ExceptionEnum.ART_UNAUTHORIZED);
        }
        art.updateArtDescription(req.getDescription());
        return artRepository.save(art);
    }

    @Transactional(readOnly = true)
    public List<Art> listNewArt() {
        List<Art> newArts = artRepository.listNewArt();
        return newArts;
    }
}
