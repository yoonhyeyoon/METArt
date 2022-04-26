// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./access/Ownable.sol";

contract MetartNFT is ERC721, Ownable {

    uint256 private _tokenIdSeq;
    mapping(uint256 => string) private _tokenURIs;
    address private _saleFactoryAddress;
    
    event CreatedTokenId(uint256 tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _tokenIdSeq = 0;
    }

    function current() public view returns (uint256) {
        return _tokenIdSeq;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function setSaleFactoryAddress(address saleFactoryAddress) public onlyOwner {
        _saleFactoryAddress = saleFactoryAddress;
    }

    function approveSaleFactory(address owner) public {
        _setApprovalForAll(owner, _saleFactoryAddress, true);
    }

    function create(address to, string memory _tokenURI) public virtual returns (uint256) {
        if (!isApprovedForAll(to, _saleFactoryAddress)) {
            _setApprovalForAll(to, _saleFactoryAddress, true);
        }

        uint256 tokenId = _tokenIdSeq;
        _mint(to, tokenId);
        _tokenURIs[tokenId] = _tokenURI;
        
        _tokenIdSeq += 1;

        emit CreatedTokenId(tokenId);

        return tokenId;
    }
}