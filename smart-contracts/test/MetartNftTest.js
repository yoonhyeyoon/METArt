const MetartNFT = artifacts.require("MetartNFT");

contract("MetartNFT", (accounts) => {
  const name = "Non Fungible Token For MetartNFT";
  const symbol = "METART";
  const contractOwner = accounts[0];

  let metartNft;

  before(async function () {
    metartNft = await MetartNFT.new(name, symbol, {
      from: contractOwner,
    });
  });

  it("NFT mint, transfer, compare URI", async () => {
    const sender = accounts[1];
    const receiver = accounts[2];
    const tokenURI = "myuri://testtest";

    var tx = await metartNft.create(sender, tokenURI, {
      from: sender,
    });

    var tokenId = tx.receipt.logs[1].args["tokenId"].toNumber();

    var owner = await metartNft.ownerOf(tokenId);
    assert.equal(sender, owner, "NFT Mint Failed");

    var tokenURIFetched = await metartNft.tokenURI(tokenId);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");

    await metartNft.transferFrom(sender, receiver, tokenId, {
      from: sender,
    });
    owner = await metartNft.ownerOf(tokenId);

    assert.equal(receiver, owner, "NFT Transfer Failed.");
  });
});
