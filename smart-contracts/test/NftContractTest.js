/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("NFTIslandBadge");

contract("NftCreator", (accounts) => {
  const name = "Non Fungible Token For NFTIsland";
  const symbol = "BADGE";
  const contractOwner = accounts[0];

  let nftCreatorInstance;

  before(async function () {
    // set contract instance into a variable
    nftCreatorInstance = await NftCreator.new(name, symbol, {
      from: contractOwner,
    });
    // nftCreatorInstance = await NftCreator.deployed();
  });

  it("NFT mint, transfer, compare URI", async () => {
    const sender = accounts[1];
    const receiver = accounts[2];
    const tokenURI = "myuri://testtest";

    // create 호출 후, tokenId 생성과 owner 지정 테스트
    var outTokenIds = await nftCreatorInstance.create.call(
      sender,
      tokenURI,
      true,
      3,
      {
        from: sender,
      }
    );

    var tokenIds = outTokenIds.map((outTokenId) => outTokenId.toNumber());

    await nftCreatorInstance.create(sender, tokenURI, true, 3, {
      from: sender,
    });

    for (var i = 0; i < 3; i++) {
      var tokenId = tokenIds[i];

      var owner = await nftCreatorInstance.ownerOf(tokenId);
      assert.equal(sender, owner, "NFT Mint Failed");

      var tokenURIFetched = await nftCreatorInstance.tokenURI(tokenId);
      assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
    }

    var tokenId = tokenIds[0];

    // transfer 호출 후, 해당 token의 owner가 잘 넘어갔는지 확인
    await nftCreatorInstance.transferFrom(sender, receiver, tokenId, {
      from: sender,
    });
    owner = await nftCreatorInstance.ownerOf(tokenId);

    assert.equal(receiver, owner, "NFT Transfer Failed.");
  });
});
