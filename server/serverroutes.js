// Account Information Route

Picker.route('/mt4/:account', function(params,req,res,next) {
 
  res.end("Account Info Received");
  var x = params.account;
  var uri_dec = decodeURIComponent(x);
  var accountJSON = uri_dec.replace(/'/g,"\"");

  
  obj=JSON.parse(accountJSON);
  

  // If no Account Item is availabe, insert one
  
  if(AccountInfo.find().count() == 0) {

	AccountInfo.insert(obj);	

 }
	
else {

    AccountInfo.update({},   {$set: obj });

}

  
});



Picker.route('/openorders/:orders', function(params,req,res,next) {

  res.end("Orders cleaned up");   
  
  var oneTrade = params.orders.split(',');
  var user=oneTrade[0];
  var ticket=parseInt(oneTrade[1]);
  var symbol=oneTrade[2];
  var open=Number(oneTrade[3]);
  var close=Number(oneTrade[4]);
  var lots=Number(oneTrade[5]);
  var commission=Number(oneTrade[6]);
  var swap=Number(oneTrade[7]);
  var expiration=oneTrade[8];
  var comment=oneTrade[9];
  var stoploss=Number(oneTrade[10]);
  var takeprofit=Number(oneTrade[11]);
  var type=oneTrade[12];
  var opentime=oneTrade[13];
  var closetime=oneTrade[14];
  var magic=oneTrade[15];
  var profit=Number(oneTrade[16]);

  
 
//console.log(ticket);  


OpenOrders.update({ticket: ticket}, 
          {$set: {
            user: user, 
            ticket: ticket,
            symbol: symbol,
            open: open,
            close: close,
            lots: lots,
            commission: commission,
            swap: swap,
            expiration: expiration,
            comment: comment,
            stoploss: stoploss,
            takeprofit: takeprofit,
            type: type,
            opentime: opentime,
            closetime: closetime,
            magic: magic,
            orderprofit: profit


          }}, {upsert: true}

);



});

Picker.route('/cleanuporders/:orderlist', function(params,req,res,next) {
  
  res.end("Orders cleaned up");
  var theOrders = params.orderlist.split(',');
  
  for(i=0;i<theOrders.length;i++) {
      theOrders[i] = parseInt(theOrders[i]);

  }
 

  OpenOrders.remove({ ticket: { $nin: theOrders }});
  
  

});



// Route receiving all symbols

Picker.route('/allsymbols/:symbols', function(params,req,res,next) {
  

  res.end("Symbols received");
  //console.log(params.symbols);
  
  var theSymbols = params.symbols.split(',');
  var theSymbolArray = [];

  var i=0;
  var j=0;
  while(i<theSymbols.length) {

      var theSymbol = theSymbols[i];
      theSymbolArray[j] = theSymbols[i];
      theSymbol = decodeURIComponent(theSymbol);
      var theBid = parseFloat(theSymbols[i+1]);
      var theAsk  = parseFloat(theSymbols[i+2]); 
      i+=3;
      j+=1;


     Symbols.update({symbol: theSymbol}, 
            {$set: {
              symbol: theSymbol, 
              bid: theBid,
              ask: theAsk
            }}, {upsert: true}); 
  }

  console.log(theSymbolArray);

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