// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./access/Ownable.sol";

contract MetartNFT is ERC721, Ownable {

    uint256 private _tokenIdSeq;
    mapping(uint256 => string) private _tokenURIs;
    address private _auctionAddress;
    
    event CreateToken(uint256 indexed tokenId, address indexed owner);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _tokenIdSeq = 0;
    }

    function current() public view returns (uint256) {
        return _tokenIdSeq;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function setAuctionAddress(address auctionAddress) public onlyOwner {
        _auctionAddress = auctionAddress;
    }

    function approveAuction(address owner) public {
        _setApprovalForAll(owner, _auctionAddress, true);
    }

    function create(address to, string memory _tokenURI) public virtual returns (uint256) {
        uint256 tokenId = _tokenIdSeq;
        _mint(to, tokenId);
        _tokenURIs[tokenId] = _tokenURI;
        
        _tokenIdSeq += 1;

        emit CreateToken(tokenId, to);

        return tokenId;
    }
}