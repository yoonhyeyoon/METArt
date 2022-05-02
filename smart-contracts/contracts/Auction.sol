// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./MetartNFT.sol";

contract Auction is Ownable {

    struct Sale {
        uint256 saleId;
        uint256 tokenId;
        address seller;
        address buyer;
        uint256 price;
        bool ended;
    }

    MetartNFT public metartNFT;
    uint256 private _saleIdSeq;
    mapping(uint256 => Sale) public sales;
    
    event CreateSale(uint256 indexed saleId, address indexed seller, uint256 indexed price);
    event EndSale(uint256 indexed saleId, address indexed seller, address indexed buyer);

    constructor(address _nftAddress) {
        _saleIdSeq = 0;
        metartNFT = MetartNFT(_nftAddress);
    }

    function createSale(
        uint256 tokenId,
        uint256 price
    ) public returns (uint256) {
        address seller = msg.sender;
        require(metartNFT.ownerOf(tokenId) == seller, "Auction: seller is not owner of this item");

        if (!metartNFT.isApprovedForAll(seller, address(this))) {
            metartNFT.approveAuction(seller);
        }
        
        uint256 saleId = _saleIdSeq;
        _saleIdSeq += 1;

        Sale storage sale = sales[saleId];
        sale.saleId = saleId;
        sale.tokenId = tokenId;
        sale.seller = seller;
        sale.price = price;
        sale.ended = false;
        
        metartNFT.transferFrom(msg.sender, address(this), sale.tokenId);

        emit CreateSale(saleId, seller, price);
        
        return saleId;
    }

    function getSaleIdSeq() public view returns (uint256) {
        return _saleIdSeq;
    }
    
    function getSale(uint256 saleId) public view returns (Sale memory) {
        return sales[saleId];
    }

    function purchase(uint256 saleId) public payable {
        Sale storage sale = sales[saleId];
        require(saleId < _saleIdSeq, "Auction: This saleId is incorrect");
        require(!sale.ended, "Auction: This sale is ended");
        require(msg.sender != sale.seller, "Auction: Purchse caller is seller");
        require(msg.value >= sale.price, "Auction: buyer sent lower than price");

        payable(sale.seller).transfer(msg.value);
        metartNFT.transferFrom(address(this), msg.sender, sale.tokenId);

        sale.buyer = msg.sender;
        sale.ended = true;
        
        emit EndSale(saleId, sale.seller, sale.buyer);
    }

    function cancelSale(uint256 saleId) public {
        Sale storage sale = sales[saleId];
        require(saleId < _saleIdSeq, "Auction: This saleId is incorrect");
        require(msg.sender == sale.seller || msg.sender == this.owner(), "Auction: Cancel caller is not seller nor contract owner");
        require(!sale.ended, "Auction: This sale is ended");
        
        metartNFT.transferFrom(address(this), msg.sender, sale.tokenId);
        sale.ended = true;

        emit EndSale(saleId, sale.seller, sale.buyer);
    }
}
