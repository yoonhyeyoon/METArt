// BASE_URL
import { SERVER_BASE_URL, LOCAL_BASE_URL } from "./metart-config.js";

const BASE_URL = SERVER_BASE_URL;

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

/* save art
 * 1. POST {BASE_URL}/image 요청을 통해 imageFile을 S3에 올리고 파일 경로(tokenURI)를 받는다.
 * 2. 받아온 tokenURI를 이용하여 metartNFT 컨트랙트를 이용해 create 함수를 호출한다.
 * 3. 트랜잭션이 발생되면 (.on("transactionHash")) 해당 해쉬 값과 함께 POST {BASE_URL}/art 요청을 보낸다.
 * 4. 이제 트랜잭션이 완료되면 서버에서 알아서 결과를 DB에 저장하게 된다.
 */
var imageFile = document.getElementById("imageFile");
var saveArt = document.getElementById("saveArt");
saveArt.addEventListener("click", function () {
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
