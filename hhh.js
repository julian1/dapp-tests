
// # use in node, 
// cd /root/docker/x/
// .load hhh.js

var web3 = require('web3');
var fs = require('fs');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// var source = "contract test { function multiply(uint a) returns(uint d) { return a * 7; } }"

// non var, to place in global scope
// source = fs.readFileSync('/root/docker/x/test.solc' ).toString('ascii');
source = fs.readFileSync('test.solc' ).toString('ascii');

compiled = web3.eth.compile.solidity(source);


