// get account btn
import { getAccount } from "./functions.js";

var account;
var getAccountBtn = document.getElementById("get-account-btn");
getAccountBtn.addEventListener("click", async function () {
  await getAccount().then((res) => {
    account = res;
    console.log(account);
  });
});

// get web3 provider & contract
import {
  metartNftAbi,
  metartNftCA,
  auctionAbi,
  auctionCA,
} from "./metart-config.js";

const web3 = new Web3(Web3.givenProvider);
const metartNftContract = new web3.eth.Contract(metartNftAbi, metartNftCA);
const auctionContract = new web3.eth.Contract(auctionAbi, auctionCA);

var imageFile = document.getElementById("imageFile");
var saveArt = document.getElementById("saveArt");
saveArt.addEventListener("click", function () {
  var tokenURI;
  axios({
    url: "http://localhost:8080/v1/image",
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
          axios({
            url: "http://localhost:8080/v1/art",
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
