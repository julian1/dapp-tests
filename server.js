
// refs https://github.com/websockets/ws

var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 80;

var path = require('path');
var web3 = require('web3');
var fs = require('fs');


web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


////////////
/// Need to find out how can record the contract...
source = fs.readFileSync('./token.solc' ).toString('ascii');
compiled = web3.eth.compile.solidity(source);
contract = web3.eth.contract(compiled.token.info.abiDefinition);
token = contract.at('0xadd1a267057309c917e1ac794050201378e13b0d');

var event = token.CoinTransfer({}, '', function(error, result){
  if (!error) {
/*    console.log("Coin transfer: " 
      + result.args.amount + " tokens were sent. Balances now are as following: \n Sender:\t" 
      + result.args.sender + " \t" + token.coinBalanceOf.call(result.args.sender) 
      + " tokens \n Receiver:\t" + result.args.receiver + " \t" 
      + token.coinBalanceOf.call(result.args.receiver) + " tokens" );
*/

  wss.clients.forEach(function each(ws) {
    ws.send( JSON.stringify( {type: "token_sent" }), function ack(error) {
      // client.send( result,  function ack(error) {
        if( error != undefined) {
          console.log( "problem sending " + error );
        }
    });
  });
  }
});
////////////




// Additionally you can start watching right away, by passing a callback:
// lets, try and send a message... to all listeners,
web3.eth.filter("latest", function(error, result) {
  if (!error) {
    console.log("whoot block " + result);
    web3.eth.getBlock("latest", function(error, result) {
      if (!error) {
        wss.clients.forEach(function each(ws) {

          console.log("sending block " + result);
          ws.send( JSON.stringify( {type: "block", block: result }), function ack(error) {
            // client.send( result,  function ack(error) {
              if( error != undefined) {
                console.log( "problem sending " + error );
              }
          });
        });
      }
    });
  }
});


// bind ws lexically
var recursive = function () {

  wss.clients.forEach(function each(ws) {

    // this isn't very 
    console.log("sending tick");
 
    ws.send( JSON.stringify({type: "tick" }), function ack(error) {
      if(error != undefined) {
        console.log( "problem sending " + error );
      } 
    });
  });

  // only want to do this when really sent...
  setTimeout(recursive,1000);
}

// recursive();




// serves files index.html etc
app.use('/', express.static(path.join(__dirname, 'dist')));


// recursive();

//app.use(function (req, res) {
//  res.send({ msg: "hello" });
//});
// would be good to push a time/date object in the server tick...

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  console.log('got connection : %s', location );
  //console.log(ws);


  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function incoming() {
    console.log('GOT CLOSE');
  });

  // needs error handling
  // ws.send('the server');
});


server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });


