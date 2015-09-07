
// In node,
// .load deploy.js


fs = require('fs');
web3 = require('web3');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// source = fs.readFileSync('/root/docker/x/token.solc' ).toString('ascii');
source = fs.readFileSync('./token.solc' ).toString('ascii');
// console.log(source);

compiled = web3.eth.compile.solidity(source);
// console.log(compiled);

contract = web3.eth.contract(compiled.token.info.abiDefinition);
// console.log(contract);


// deploy...
if(false) {
  var supply = 1000;
  var token = contract.new(
    supply,
    {
      from:web3.eth.accounts[0],
      data:compiled.token.code,
      gas: 1000000
    }, function(e, contract){
      if(!e) {
        if(!contract.address) {
          console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
          console.log("Contract mined! Address: " + contract.address);
          console.log(contract);
        }
      }
      else {
          console.log(e );
      }
  });
};


// Contract mined! Address: 0xadd1a267057309c917e1ac794050201378e13b0d

// now we want to try and do something with the k.
// contract.new() and contract.at() ... are the way to interact...
token = contract.at('0xadd1a267057309c917e1ac794050201378e13b0d');

console.log( token.coinBalanceOf(web3.eth.accounts[0]) + " tokens" )


process.exit();
