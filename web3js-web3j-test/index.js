// BASE_URL
import { SERVER_BASE_URL, LOCAL_BASE_URL } from "./metart-config.js";

var BASE_URL = LOCAL_BASE_URL;
var server = document.getElementById("server");
var localBtn = document.getElementById("local-btn");
var serverBtn = document.getElementById("server-btn");

localBtn.addEventListener("click", function () {
  BASE_URL = LOCAL_BASE_URL;
  server.innerText = "Local";
});
serverBtn.addEventListener("click", function () {
  BASE_URL = SERVER_BASE_URL;
  server.innerText = "Server";
});

// get account btn
var account;
var getAccountBtn = document.getElementById("get-account-btn");
getAccountBtn.addEventListener("click", async function () {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
      document.getElementById("account").innerText = account;
      console.log(account);
    } else {
      alert("Install Metamask!");
    }
  } catch (error) {
    console.error(error);
  }
});

/* create art
 * 1. POST {BASE_URL}/image 요청을 통해 imageFile을 S3에 올리고 파일 경로(tokenURI)를 받는다.
 * 2. 받아온 tokenURI를 이용하여 metartNFT 컨트랙트를 이용해 create 함수를 호출한다.
 * 3. 트랜잭션이 발생되면 (.on("transactionHash")) 해당 해쉬 값과 함께 POST {BASE_URL}/art 요청을 보낸다.
 * 4. 이제 트랜잭션이 완료되면 서버에서 알아서 결과를 DB에 저장하게 된다.
 */
const web3 = new Web3(Web3.givenProvider);

import { metartNftAbi, metartNftCA } from "./metart-config.js";
const metartNftContract = new web3.eth.Contract(metartNftAbi, metartNftCA);

var imageFile = document.getElementById("image-file");
var createArtBtn = document.getElementById("create-art-btn");
createArtBtn.addEventListener("click", function () {
  var tokenURI;
  axios({
    url: `${BASE_URL}/image`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      imageFile: imageFile.files[0],
    },
  })
    .then((res) => {
      tokenURI = res.data;
      metartNftContract.methods
        .create(account, tokenURI)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          console.log(hash);
          document.getElementById("create-art-tx").innerText = hash;
          axios({
            url: `${BASE_URL}/art`,
            method: "post",
            data: {
              tx: hash,
              name: "작품이름",
              description: "작품설명",
              tokenURI: tokenURI,
            },
          })
            .then((res) => {
              console.log(res);
              document.getElementById("save-art-res").innerText =
                JSON.stringify(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .on("error", (error, receipt) => {
          console.log(error);
          console.log(receipt);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* create sale
 * 1. Auction 컨트랙트를 이용해 create 함수를 호출한다.
 * 2. 트랜잭션이 발생되면 (.on("transactionHash")) 해당 해쉬 값과 함께 POST {BASE_URL}/sale 요청을 보낸다.
 * 3. 이제 트랜잭션이 완료되면 서버에서 알아서 결과를 DB에 저장하게 된다.
 */
import { auctionAbi, auctionCA } from "./metart-config.js";
const auctionContract = new web3.eth.Contract(auctionAbi, auctionCA);

var price = 0.001 * Math.pow(10, 18); // 0.001 ETH
var createSaleBtn = document.getElementById("create-sale-btn");
createSaleBtn.addEventListener("click", function () {
  var tokenId = document.getElementById("token-id").value;

  auctionContract.methods
    .createSale(tokenId, price)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log(hash);
      document.getElementById("create-sale-tx").innerText = hash;
      axios({
        url: `${BASE_URL}/sale`,
        method: "post",
        data: {
          tx: hash,
          tokenId: tokenId,
        },
      })
        .then((res) => {
          console.log(res);
          document.getElementById("save-sale-res").innerText = JSON.stringify(
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

/* cancel Sale
 * 1. Auction 컨트랙트를 이용해 cancelSale 함수를 호출한다.
 * 2. 트랜잭션이 발생되면 (.on("transactionHash")) 해당 해쉬 값과 함께 PUT {BASE_URL}/sale/{saleId}/cancel 요청을 보낸다.
 * 3. 이제 트랜잭션이 완료되면 서버에서 알아서 결과를 DB에 저장하게 된다.
 */
var cancelSaleBtn = document.getElementById("cancel-sale-btn");
cancelSaleBtn.addEventListener("click", function () {
  var cancelSaleId = document.getElementById("cancel-sale-id").value;

  auctionContract.methods
    .cancelSale(cancelSaleId)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log(hash);
      document.getElementById("cancel-sale-tx").innerText = hash;
      axios({
        url: `${BASE_URL}/sale/${cancelSaleId}/cancel`,
        method: "put",
        data: {
          tx: hash,
        },
      })
        .then((res) => {
          console.log(res);
          document.getElementById("cancel-sale-res").innerText = JSON.stringify(
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

/* purchase
 * 1. Auction 컨트랙트를 이용해 purchase 함수를 호출한다.
 * 2. 트랜잭션이 발생되면 (.on("transactionHash")) 해당 해쉬 값과 함께 PUT {BASE_URL}/sale/{saleId}/purchase 요청을 보낸다.
 * 3. 이제 트랜잭션이 완료되면 서버에서 알아서 결과를 DB에 저장하게 된다.
 */
var purchaseBtn = document.getElementById("purchase-btn");
purchaseBtn.addEventListener("click", function () {
  var purchaseId = document.getElementById("purchase-id").value;

  auctionContract.methods
    .purchase(purchaseId)
    .send({ from: account, value: price })
    .on("transactionHash", (hash) => {
      console.log(hash);
      document.getElementById("purchase-tx").innerText = hash;
      axios({
        url: `${BASE_URL}/sale/${purchaseId}/purchase`,
        method: "put",
        data: {
          tx: hash,
        },
      })
        .then((res) => {
          console.log(res);
          document.getElementById("purchase-res").innerText = JSON.stringify(
            res.data
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
