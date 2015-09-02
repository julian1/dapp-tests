var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  addItem: function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.ADD_ITEM,
      item: item
    });
  },
  removeItem: function(itemIndex){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.REMOVE_ITEM,
      itemIndex: itemIndex
    });
  }
}

module.exports = AppActions;

var count = 0;

  // is this correct??? yes... we get the connection.. 
  var wsUri = "ws://127.0.0.1/";

  function init()
  {

      AppActions.addItem("connecting");
    // console.log( "connecting to websocket" );
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }

  function onOpen(evt)
  {
    // console.log("onOpen");
      AppActions.addItem("onOpen");
    doSend("WebSocket rocks");
  }

  function onClose(evt)
  {
      AppActions.addItem("onClose");
    //console.log("onClose");
    // writeToScreen("DISCONNECTED");
  }

  function onMessage(evt)
  {
    //console.log( "onMessage begin " + evt.data );
      AppActions.addItem("onMessage" + evt.data + count++ );
    //console.log( "onMessage finish " );
  }

  function onError(evt)
  {
      AppActions.addItem("onError");
    // console.log("onError" + evt.data );
    // writeToScreen('<span style="color: red;">ERROR:</span> ' +  evt.data  );
  }

  function doSend(message)
  {
    // console.log("doSEnd " + message);
    // writeToScreen("SENT: " + message); 
    websocket.send(message);
  }

init();

