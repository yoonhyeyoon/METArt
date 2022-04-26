const NFTIslandBadge = artifacts.require("NFTIslandBadge");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let saleFactoryContract, nftContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
  const contractOwner = accounts[3];
  const seller = accounts[4];
  const purchaser = accounts[5];

  const uri = "testURI";
  const price = 100;
  const initPurchaserBalance = 100;

  async function createSale() {
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

    await saleFactoryContract.createSale(itemId, price, nftContract.address, {
      from: seller,
    });

    var sales = await saleFactoryContract.allSales();
    saleContract = await Sale.at(sales[0]);
  }

  it("Create Sale", async () => {
    await createSale();

    var saleInfo = await saleContract.getSaleInfo.call();

    assert.equal(
      itemId,
      saleInfo["1"].toNumber(),
      "itemId in SaleInfo is not correct"
    );
  });

  it("Purchase", async () => {
    await createSale();
    await saleContract.purchase({ from: purchaser, value: price });

    var owner = await nftContract.ownerOf.call(itemId);

    assert.equal(purchaser, owner, "Not Owned By Purchaser");
  });

  it("Cancel", async () => {
    await createSale();

    await saleContract.cancelSale({ from: seller });

    var owner = await nftContract.ownerOf.call(itemId);
    assert.equal(seller, owner, "Cancellation Failed");
  });
});
