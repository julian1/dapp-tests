
var web3 = require('web3');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


var latest = web3.eth.getBlock("latest"); 

console.log(latest);

process.exit();

