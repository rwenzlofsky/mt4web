// Account Information Route

Picker.route('/mt4/:account', function(params,req,res,next) {
 
  res.end("Account Info Received");
  var x = params.account;
  var uri_dec = decodeURIComponent(x);
  var accountJSON = uri_dec.replace(/'/g,"\"");

  
  obj=JSON.parse(accountJSON);
  console.log(obj);
  
  
  if(AccountInfo.find().count() == 0) {
	    AccountInfo.insert(obj);	
  }
	
  else {
      AccountInfo.update({},   {$set: obj });
  }

  
});


// Fetch all open orders

Picker.route('/openorders/:orders', function(params,req,res,next) {

  res.end("Orders cleaned up");   

  var x = params.orders;
  var uri_dec = decodeURIComponent(x);
  var accountJSON = uri_dec.replace(/'/g,"\"");

  
  obj=JSON.parse(accountJSON);
  

  OpenOrders.update({ticket: obj.ticket}, 
          {$set: {
            user: obj.user, 
            ticket: obj.ticket,
            symbol: obj.symbol,
            open: obj.open,
            close: obj.close,
            lots: obj.lots,
            commission: obj.commission,
            swap: obj.swap,
            expiration: obj.expiration,
            comment: obj.comment,
            stoploss: obj.stoploss,
            takeprofit: obj.takeprofit,
            type: obj.type,
            opentime: obj.opentime,
            closetime: obj.closetime,
            magic: obj.magic,
            orderprofit: obj.profit


          }}, {upsert: true});


});

// Remove all orders from collection which are not in the order list from MT4

Picker.route('/cleanuporders/:orderlist', function(params,req,res,next) {
  
  res.end("Orders cleaned up");
  var theOrders = params.orderlist.split(',');
  var theUser = theOrders[0];

  for(i=1;i<theOrders.length;i++) {
      theOrders[i] = parseInt(theOrders[i]);

  }
 
  OpenOrders.remove({ ticket: { $nin: theOrders }, user: {theUser} });
  
});



// Route receiving all symbols

Picker.route('/allsymbols/:symbols', function(params,req,res,next) {
  
  res.end("Symbol-List received");

  var x = params.symbols;
  var uri_dec = decodeURIComponent(x);
  var theJSON = uri_dec.replace(/'/g,"\"");
  var j=JSON.parse(theJSON);
  var theSymbolArray = [];
  
//  console.log(j);

  j.forEach(function(theSymbol) {
     
     Symbols.update({symbol: theSymbol.s, user: theSymbol.u}, 
                {$set: {
                  symbol: theSymbol.s, 
                  bid: theSymbol.b,
                  ask: theSymbol.a,
                  user: theSymbol.u
                }}, {upsert: true}); 

     theSymbolArray.push(theSymbol.s);
    

  });

  
  Symbols.remove({ symbol: { $nin: theSymbolArray }});


}); 


// Handle tradeQueue

Picker.route('/getqueue/:action', function(params,req,res,next) {
  
  console.log(params.action);
  if (params.action === 'closed') {
      console.log("Client: Trade Closed successfully");

  } else if (params.action === 'read') {
      console.log("Client: Fetching queue");      

  }


  var closeit=tradeQueue.findOne({}); 

  if (closeit === undefined) {
    
    res.end("OK");   
  }
  else {
      
        tradeQueue.remove({});
        console.log("Close",closeit.ticket);
        res.end("" + closeit.activity + ":" + closeit.ticket);
    
  }

});


//////////////////////////////////////////////////////////////////////
// Notification about market status change received
//////////////////////////////////////////////////////////////////////
Picker.route('/marketstatus/:status', function(params,req,res,next) {
  

  res.end("Market status updated");

  console.log("Status: ", params.status);
  
  if(params.status === 'closed')
  {

    console.log("Market was closed");
  } else {

    console.log("Market was opened");

  }

     marketStatus.update({}, 
            {$set: {
              status: params.status, 
            }}, {upsert: true}); 

}); 