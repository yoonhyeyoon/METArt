// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./NFTIslandBadge.sol";

contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    NFTIslandBadge public erc721Contract;
    
    event CreatedSaleAddress(address saleAddress);

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor(address _nftAddress) {
        admin = msg.sender;
        erc721Contract = NFTIslandBadge(_nftAddress);
    }

    function createSale(
        uint256 itemId,
        uint256 purchasePrice,
        address nftAddress
    ) public returns (address) {
        address seller = msg.sender;
        require(erc721Contract.ownerOf(itemId) == seller, "SaleFactory: seller is not owner of this item");
        require(erc721Contract.isPublic(itemId), "SaleFactory: this token can't be sold");

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

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public nftAddress;
    bool public ended;

    NFTIslandBadge public erc721Contract;

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
        erc721Contract = NFTIslandBadge(_nftAddress);
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
        require(!ended, "Sale: This sale is ended");
        require(msg.sender == seller || msg.sender == admin, "Sale: Cancel caller is not seller nor admin");

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

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
}
