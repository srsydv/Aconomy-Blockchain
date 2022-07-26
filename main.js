const Web3 = require("web3");
const piNFT = '0x70471257eA04F9E3262458374e046B0504d687f6'
const piMarket = '0x2BC997DaF93625A574463Ae9fCbdEB400fbFe3A7'
const piNFTabi = require('./piNFTabi.json');
const piMarketAbi = require('./piMarketAbi.json');
const MTK = '0x08268C6A177Cd529DEAB226829C739C93f463994'
const ERC20ABI = require('./ERC20.json')
const ERC20Address = document.getElementById("ERC20Address");



init = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log("Connected");
  } else {
    alert("Metamask not found");
  }
  piNFTmethods = new web3.eth.Contract(
    piNFTabi,
    piNFT
  );
  piMarketmethods = new web3.eth.Contract(
    piMarketAbi,
    piMarket
  );
  console.log("aaaa", piNFTmethods);
  accounts = await web3.eth.getAccounts();
  console.log("Account", accounts[0]);
};

mintNFT = async () => {
  // document.getElementById('11').innerHTML = '🔜';
  await piNFTmethods.methods
    .mintNFT(ownerAddress.value, uri.value,
      [[royaltyReciever.value, royaltyValue.value]])
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
      //   let data = JSON.stringify(reciept.events.Transfer.returnValues.tokenId);
      // document.getElementById('11').innerHTML = data;
    });
  console.log("Minted!!");
};

const ownerAddress = document.getElementById("ownerAddress");
const royaltyReciever = document.getElementById("royaltyReciever");
const royaltyValue = document.getElementById("royaltyValue");
const uri = document.getElementById("uri");
const btnMintNFT = document.getElementById("btnCreateItem");
btnMintNFT.onclick = mintNFT;

Approve = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';
  contractERC20 = new web3.eth.Contract(
    ERC20ABI,
    erc20token.value
  );
  await contractERC20.methods
    .approve(piNFT, tokenamount1.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('123').innerHTML = "Approved👍";
}
const erc20token = document.getElementById("erc20token");
const tokenamount1 = document.getElementById("tokenamount1");
const btnApprove = document.getElementById("btnApprove");
btnApprove.onclick = Approve;

energizeWithERC20 = async () => {
  let flag = 0;
  document.getElementById('1234').innerHTML = 'Processing🔜';

  await piNFTmethods.methods
    .addERC20(
      accounts[0],
      getTokenId.value,
      ERC20Address.value,
      getTokenAmount.value
    )
    .send({ from: accounts[0] }).once("receipt2", (reciept) => {
      console.log(reciept);
    });

  document.getElementById('1234').innerHTML = "Energized!!✅";
  console.log("Energized!!");
};
const getTokenAmount = document.getElementById("getTokenAmount");
const getTokenId = document.getElementById("getTokenId");

const btnGetToken = document.getElementById("btnGetToken");
btnGetToken.onclick = energizeWithERC20;


ReleaseERC20 = async () => {
  document.getElementById('process3').innerHTML = 'Processing🔜';
  const receipt = await piNFTmethods.methods
    .transferERC20(
      TokenIdofNFT.value,
      receverAddressofERC20.value,
      Erc20address1.value,
      sendTokenAmount.value
    )
    .send({ from: accounts[0] });
  document.getElementById('process3').innerHTML = 'Released!!✅';
  console.log(receipt);
  console.log("Released!!");
};
Erc20address1 = document.getElementById("Erc20address1");
const receverAddressofERC20 = document.getElementById("receverAddressofERC20");
const sendTokenAmount = document.getElementById("sendTokenAmount");
const TokenIdofNFT = document.getElementById("TokenIdofNFT");

const btnSendToken = document.getElementById("btnSendToken");
btnSendToken.onclick = ReleaseERC20;


showBalanceOfNFT = async () => {
  const receipt = await piNFTmethods.methods
    .viewBalance(tid.value, enterAddress.value)
    .call();
  document.getElementById('process4').innerHTML = receipt;
  console.log(receipt);
};
const enterAddress = document.getElementById("enterAddress");
const tid = document.getElementById("tid");
const btnAccountBalance = document.getElementById("btnAccountBalance");
btnAccountBalance.onclick = showBalanceOfNFT;




// piNFTmarket Place web3 fn

ApproveNFT = async () => {

  await piNFTmethods.methods
    .approve(piMarket, tokenIdofNFT.value)
    .send({ from: accounts[0] });
  console.log("approved");
  // document.getElementById('123').innerHTML = "Approved👍";
}
const tokenIdofNFT = document.getElementById("tokenIdofNFT");
const btnApproveforNFT = document.getElementById("btnApproveforNFT");
btnApproveforNFT.onclick = ApproveNFT;


ownerOf = async () => {

  const r = await piNFTmethods.methods
    .ownerOf(3)
    .call();
  console.log("owner", r);
  // document.getElementById('123').innerHTML = "Approved👍";
}
const ownerNFT = document.getElementById("ownerNFT");
ownerNFT.onclick = ownerOf;


sellNFT = async () => {

  await piMarketmethods.methods
    .sellNFT(piNFT, tokenIdNFT.value, priceValue.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const tokenIdNFT = document.getElementById("tokenIdNFT");
const priceValue = document.getElementById("priceValue");
const btnSellNFT = document.getElementById("btnSellNFT");
btnSellNFT.onclick = sellNFT;

buyNFT = async () => {

  await piMarketmethods.methods
    .BuyNFT(saleId.value)
    .send({
      from: accounts[0],
      value: valueofNFT.value
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const saleId = document.getElementById("saleId");
const valueofNFT = document.getElementById("valueofNFT");
const btnBuyNFT = document.getElementById("btnBuyNFT");
btnBuyNFT.onclick = buyNFT;


cancleSell = async () => {

  await piMarketmethods.methods
    .cancelSale(CancelSale.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}
const CancelSale = document.getElementById("CancelSale");
const btnCancelSale = document.getElementById("btnCancelSale");
btnCancelSale.onclick = cancleSell;


//Approve ERC721
ApproveTokenId = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piNFTmethods.methods
    .approve(piMarket, tokenidforapprove.value)
    .send({ from: accounts[0] });
  console.log("approved");
  document.getElementById('123').innerHTML = "Approved👍";
}
const tokenidforapprove = document.getElementById("tokenidforapprove");
const btnApprovefortokenId = document.getElementById("btnApprovefortokenId");
btnApprovefortokenId.onclick = ApproveTokenId;


//Sell NFT By Bid
SellNFTbyBid = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .SellNFT_byBid(piNFT, tokenidforbidsell.value, priceforbidsell.value, bidtime.value)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const tokenidforbidsell = document.getElementById("tokenidforbidsell");
const priceforbidsell = document.getElementById("priceforbidsell");
const bidtime = document.getElementById("bidtime");
const btnSellNFTByBid = document.getElementById("btnSellNFTByBid");
btnSellNFTByBid.onclick = SellNFTbyBid;

//Bidding
Bidding = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .Bid(BidsaleId.value)
    .send({
      from: accounts[0],
      value: Bidvalue.value
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const Bidvalue = document.getElementById("Bidvalue");
const BidsaleId = document.getElementById("BidsaleId");
const btnforBid = document.getElementById("btnforBid");
btnforBid.onclick = Bidding;


executeBidOrderfn = async () => {
  document.getElementById('123').innerHTML = 'Processing🔜';

  await piMarketmethods.methods
    .executeBidOrder(saleIdforececution.value, bidOrderID.value)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const saleIdforececution = document.getElementById("saleIdforececution");
const bidOrderID = document.getElementById("bidOrderID");
const btnexecuteBid = document.getElementById("btnexecuteBid");
btnexecuteBid.onclick = executeBidOrderfn;


withdrawBidMoneyfn = async () => {
  await piMarketmethods.methods
    .withdrawBidMoney(saleIdforWithdraw.value, bidOrderIDforWithdraw.value)
    .send({
      from: accounts[0]
    })
    .once("receipt", (reciept) => {
      console.log(reciept);
    });
}

const saleIdforWithdraw = document.getElementById("saleIdforWithdraw");
const bidOrderIDforWithdraw = document.getElementById("bidOrderIDforWithdraw");
const btnWithdraw = document.getElementById("btnWithdraw");
btnWithdraw.onclick = withdrawBidMoneyfn;

init();
