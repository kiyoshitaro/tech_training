const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
console.log("🚀 ~ file: test.js:5 ~ web3:", web3)
const acc1 = '0x12604D32774A1A945Ae3e71730bED41795445423';

const t = web3.eth.getBalance(acc1)
console.log("🚀 ~ file: test.js:8 ~ t:", t)
