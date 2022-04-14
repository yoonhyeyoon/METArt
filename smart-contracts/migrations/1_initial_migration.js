const NFTIslandBadge = artifacts.require("NFTIslandBadge");
const SaleFactory = artifacts.require("SaleFactory");

const name = "Non Fungible Token For NFTIsland";
const symbol = "BADGE";

module.exports = function (deployer) {
  var nftInstance;
  deployer
    .deploy(NFTIslandBadge, name, symbol)
    .then(function (instance) {
      nftInstance = instance;
      return deployer.deploy(SaleFactory, NFTIslandBadge.address);
    })
    .then(function (saleFactoryInstance) {
      return nftInstance.setSaleFactoryAddress(saleFactoryInstance.address);
    });
};
