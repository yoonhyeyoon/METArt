const MetartNFT = artifacts.require("MetartNFT");
const Auction = artifacts.require("Auction");

const name = "Non Fungible Token For MetartNFT";
const symbol = "METART";

module.exports = function (deployer) {
  var metartNft;
  deployer
    .deploy(MetartNFT, name, symbol)
    .then(function (res) {
      metartNft = res;
      return deployer.deploy(Auction, MetartNFT.address);
    })
    .then(function (auction) {
      return metartNft.setAuctionAddress(auction.address);
    });
};
