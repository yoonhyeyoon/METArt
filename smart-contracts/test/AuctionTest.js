const MetartNFT = artifacts.require("MetartNFT");
const Auction = artifacts.require("Auction");
let auction, metartNft;
let tokenId = 0;
let saleId = 0;

contract("Sale Contract Testing", (accounts) => {
  const contractOwner = accounts[3];
  const seller = accounts[4];
  const purchaser = accounts[5];

  const uri = "testURI";
  const price = 100;

  async function createSale() {
    metartNft = await MetartNFT.new("Non Fungible Token For METArt", "METART", {
      from: contractOwner,
    });

    auction = await Auction.new(metartNft.address, {
      from: contractOwner,
    });

    await metartNft.setAuctionAddress(auction.address, {
      from: contractOwner,
    });

    await metartNft.create(seller, uri, { from: seller });

    await auction.createSale(tokenId, price, {
      from: seller,
    });

    var sale = await auction.getSale(saleId);

    return sale;
  }

  it("Create", async () => {
    var sale = await createSale();
    var saleIdSeq = await auction.getSaleIdSeq.call();
    var owner = await metartNft.ownerOf.call(tokenId);

    assert.equal(saleIdSeq, saleId + 1, "Sale is not created");
    assert.equal(tokenId, sale.tokenId, "TokenId is not correct");
    assert.equal(owner, auction.address, "Token Owner is not correct");
  });

  it("Purchase", async () => {
    await createSale();
    await auction.purchase(saleId, { from: purchaser, value: price });

    var owner = await metartNft.ownerOf.call(tokenId);
    var sale = await auction.getSale(saleId);

    assert.equal(price, sale.price, "Price in Sale is not correct");
    assert.equal(purchaser, sale.buyer, "Buyer in Sale is not correct");
    assert.equal(seller, sale.seller, "Seller in Sale is not correct");
    assert.equal(sale.ended, true, "Sale ended is not correct");
    assert.equal(purchaser, owner, "Not Owned By Purchaser");
  });

  it("Cancel", async () => {
    await createSale();
    await auction.cancelSale(saleId, { from: seller });

    var owner = await metartNft.ownerOf.call(tokenId);
    assert.equal(seller, owner, "Cancellation Failed");
  });
});
