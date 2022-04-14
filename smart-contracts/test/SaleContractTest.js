const SsafyToken = artifacts.require("SsafyToken");
const NFTIslandBadge = artifacts.require("NFTIslandBadge");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, saleFactoryContract, nftContract;
// let saleContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
  const contractOwner = accounts[3];
  const seller = accounts[4];
  const purchaser = accounts[5];

  const uri = "testURI";
  const price = 100;
  const initPurchaserBalance = 100;

  async function printBalance() {
    var sellerBalance = await ssafyTokenContract.balanceOf.call(seller);
    var purchaserBalance = await ssafyTokenContract.balanceOf.call(purchaser);

    console.log("------------------------------");
    console.log("seller: " + sellerBalance);
    console.log("purchaser: " + purchaserBalance);
    console.log("------------------------------");
  }

  async function createSale() {
    // ssafyTokenContract = await SsafyToken.new("SsafyToken", "SSF", 18, {
    //   from: contractOwner,
    // });

    // await ssafyTokenContract.mint(10000, { from: contractOwner });
    // await ssafyTokenContract.forceToTransfer(
    //   contractOwner,
    //   purchaser,
    //   initPurchaserBalance,
    //   {
    //     from: contractOwner,
    //   }
    // );

    nftContract = await NFTIslandBadge.new(
      "Non Fungible Token For NFTIsland",
      "BADGE",
      {
        from: contractOwner,
      }
    );

    saleFactoryContract = await SaleFactory.new(nftContract.address, {
      from: contractOwner,
    });

    await nftContract.setSaleFactoryAddress(saleFactoryContract.address, {
      from: contractOwner,
    });

    await nftContract.create(seller, uri, true, 1, { from: seller });

    await saleFactoryContract.createSale(
      itemId,
      price,
      // ssafyTokenContract.address,
      nftContract.address,
      {
        from: seller,
      }
    );

    var sales = await saleFactoryContract.allSales();
    saleContract = await Sale.at(sales[0]);

    // await nftContract.transferFrom(seller, saleContract.address, itemId, {
    //   from: seller,
    // });
  }

  it("Create Sale", async () => {
    await createSale();

    var saleInfo = await saleContract.getSaleInfo.call();

    assert.equal(
      itemId,
      saleInfo["1"].toNumber(),
      "itemId in SaleInfo is not correct"
    );

    // assert.equal(
    //   nftContract.address,
    //   saleInfo["3"],
    //   "nft-address in SaleInfo is not correct"
    // );
  });

  it("Purchase", async () => {
    await createSale();

    // await ssafyTokenContract.approve(saleContract.address, 100000, {
    //   from: purchaser,
    // });

    await saleContract.purchase({ from: purchaser, value: price });

    var owner = await nftContract.ownerOf.call(itemId);
    // var purchaserBalance = await ssafyTokenContract.balanceOf.call(purchaser);

    assert.equal(purchaser, owner, "Not Owned By Purchaser");
    // assert.equal(
    //   initPurchaserBalance - price,
    //   purchaserBalance,
    //   "Transfer Failed"
    // );
  });

  it("Cancel", async () => {
    await createSale();

    await saleContract.cancelSale({ from: seller });

    var owner = await nftContract.ownerOf.call(itemId);
    assert.equal(seller, owner, "Cancellation Failed");
  });
});
