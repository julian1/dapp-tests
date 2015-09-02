
var web3 = require('web3');

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


web3.eth.getBlock("latest", function(error, result) {
 
  if (!error) {
    console.log(result);
  } else {
    console.log("error " + error);
  }
  process.exit();
}); 



