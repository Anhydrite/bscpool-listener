//let url = "wss://bsc.getblock.io/mainnet/?api_key=e7393ca5-b710-4444-93a9-8a73e4b1847e"
let url = "wss://apis.ankr.com/wss/4992bb94c9ad45b5bac884081abb5dc7/fe57c79f6a5e1a368d2fc8f20cdf585a/binance/full/main"

const ethers = require('ethers');

const addresses = {
  WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  recipient: 'recipient of the profit here'
}

//First address of this mnemonic must have enough BNB to pay for tx fess

const provider = new ethers.providers.WebSocketProvider(url);
const factory = new ethers.Contract(
  addresses.factory,
  ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
  provider
);



factory.on('*', async (token0, token1, pairAddress) => {

  console.log(`
    New pair detected
    =================
    token0: ${token0.args.token0}
    token1: ${token0.args.token1}
    pairAddress: ${token0.args.pair}
    block nb: ${token0.blockNumber}
    txn hash: ${token0.transactionHash}
  `);

});
console.log("on");

