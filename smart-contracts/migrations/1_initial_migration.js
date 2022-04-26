const MetartNFT = artifacts.require("MetartNFT");
const SaleFactory = artifacts.require("SaleFactory");

const name = "Non Fungible Token For MetartNFT";
const symbol = "METART";

module.exports = function (deployer) {
  var nftInstance;
  deployer
    .deploy(MetartNFT, name, symbol)
    .then(function (instance) {
      nftInstance = instance;
      return deployer.deploy(SaleFactory, MetartNFT.address);
    })
    .then(function (saleFactoryInstance) {
      return nftInstance.setSaleFactoryAddress(saleFactoryInstance.address);
    });
};
