// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./MetartNFT.sol";

contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    MetartNFT public erc721Contract;
    
    event CreatedSaleAddress(address saleAddress);

    event NewSale(
        address indexed _saleContract,
        address indexed _owner
    );

    constructor(address _nftAddress) {
        admin = msg.sender;
        erc721Contract = MetartNFT(_nftAddress);
    }

    function createSale(
        uint256 itemId,
        uint256 purchasePrice,
        address nftAddress
    ) public returns (address) {
        address seller = msg.sender;
        require(erc721Contract.ownerOf(itemId) == seller, "SaleFactory: seller is not owner of this item");

        if (!erc721Contract.isApprovedForAll(seller, address(this))) {
            erc721Contract.approveSaleFactory(seller);
        }
        
        Sale sale = new Sale(admin, seller, itemId, purchasePrice, nftAddress);
        sales.push(address(sale));
        erc721Contract.transferFrom(msg.sender, address(sale), itemId);

        emit CreatedSaleAddress(address(sale));
        
        return address(sale);
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

contract Sale {
    address public seller;
    address public buyer;
    address admin;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public nftAddress;
    bool public ended;

    MetartNFT public erc721Contract;

    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _purchasePrice,
        address _nftAddress
    ) {
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        nftAddress = _nftAddress;
        ended = false;
        erc721Contract = MetartNFT(_nftAddress);
    }

    function purchase() public payable {   
        require(!ended, "Sale: This Sale is ended");
        require(msg.sender != seller, "Sale: Purchase caller is seller");
        require(msg.value >= purchasePrice, "Sale: buyer sent lower than purchase-price");

        payable(seller).transfer(msg.value);
        erc721Contract.transferFrom(address(this), msg.sender, tokenId);

        buyer = msg.sender;
        _end();
        emit SaleEnded(buyer, purchasePrice);
    }
    
    function cancelSale() public {
        require(msg.sender == seller || msg.sender == admin, "Sale: Cancel caller is not seller nor admin");
        require(!ended, "Sale: This sale is ended");

        erc721Contract.transferFrom(address(this), seller, tokenId);

        _end();
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address
        )
    {
        return (
            purchasePrice,
            tokenId,
            nftAddress
        );
    }

    function _end() internal {
        ended = true;
    }
}
