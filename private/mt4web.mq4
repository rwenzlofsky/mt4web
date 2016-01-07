extern string hostIp = "http://localhost/mt4";
extern string MT4user = "rcom";
static int lastMarketStatus = -1; 

int deinit() {
   EventKillTimer();
   return(0);
}

int init() {	

   EventSetTimer(1);

   return(0);
}


void sendAccountInfo()
{
  char post[];
  char result[];
  string headers;
  int res;   
  
  double accountBalance = NormalizeDouble(AccountBalance(),2);
  double accountCredit = NormalizeDouble(AccountCredit(),2);
  string accountCompany = AccountCompany();
  string accountCurrency = AccountCurrency();
  double accountEquity = NormalizeDouble(AccountEquity(),2);
  double accountFreeMargin = NormalizeDouble(AccountFreeMargin(),2);
  int accountLeverage = AccountLeverage();
  double accountMargin = NormalizeDouble(AccountMargin(),2);
  string accountName = AccountName();
  int accountNumber = AccountNumber();
  double accountProfit = NormalizeDouble(AccountProfit(),2);
  string accountServer = AccountServer();
  int accountStopoutLevel = AccountStopoutLevel();
  int accountStopoutMode = AccountStopoutMode();
  
  
  
  ////////////////////////////////////////////////////////////////////////
  // JSON Object for Account Info
  ////////////////////////////////////////////////////////////////////////
  string accountInfo = "{ " + 
                       "'balance':"   + accountBalance + "," +
                       "'credit':"   + accountCredit + "," +
                       "'company':'"  + accountCompany + "'," +
                       "'currency':'" + accountCurrency + "'," +
                       "'equity':"   + accountEquity + "," +
                       "'freemargin':" + accountFreeMargin + "," +
                       "'leverage':" + accountLeverage + "," +
                       "'margin':" + accountMargin + "," +
                       "'name':'" + accountName + "'," +
                       "'number':" + accountNumber + "," +
                       "'profit':" + accountProfit + "," +
                       "'server':'" + accountServer + "'," +
                       "'stopoutlevel':" + accountStopoutLevel + "," +
                       "'stopoutmode':" + accountStopoutMode + "," + 
                       "'user':'" + MT4user + "'" +
                       " }";
                       

  
  string positions = "";   
         
  ResetLastError();
     
    
   res=WebRequest("POST","http://localhost/mt4/"+accountInfo,NULL,NULL,50,post,ArraySize(post),result,headers);

   if(res==-1)
        {
         Print("Error code =",GetLastError());
         Print("Account Info - Server response:",CharArrayToString(result,0));

        }
   else
   {
         //Print("Server response:",CharArrayToString(result,0));
   }      	
}

// Send all open orders to the web server

void getAllOpenOrders()
{
  char post[];
  char result[];
  string headers;
  int res;  
  
  ResetLastError();
    
  int m = OrdersTotal();
  for (int i=OrdersTotal()-1;i>=0; i--) {
      if(OrderSelect(i, SELECT_BY_POS )==true) 
      {
     
       
     
         string openOrderInfo = "{ " + 
                       "'user': '" + MT4user + "'," +
                       "'ticket': "   + OrderTicket() + "," +
                       "'symbol': '"  + OrderSymbol() + "'," +
                       "'open': " + NormalizeDouble(OrderOpenPrice(),5) + "," +
                       "'close': " + NormalizeDouble(OrderClosePrice(),5) + "," +
                       "'lots': " + NormalizeDouble(OrderLots(),2) + "," +
                       "'commission': " + NormalizeDouble(OrderCommission(),2) + "," +
                       "'swap': " + NormalizeDouble(OrderSwap(),2) + "," +
                       "'expiration': '"  + TimeToString(OrderExpiration(),TIME_DATE|TIME_MINUTES|TIME_SECONDS) + "'," +
                       "'comment': '"  + OrderComment() + "'," +
                       "'stoploss': " + NormalizeDouble(OrderStopLoss(),5) + "," +
                       "'takeprofit': " + NormalizeDouble(OrderTakeProfit(),5) + "," +
                       "'type': '"  + OrderType() + "'," +
                       "'opentime': '"  + TimeToString(OrderOpenTime(),TIME_DATE|TIME_MINUTES|TIME_SECONDS) + "'," +
                       "'closetime': '"  + TimeToString(OrderCloseTime(),TIME_DATE|TIME_MINUTES|TIME_SECONDS)  + "'," +
                       "'magic': '"  + OrderMagicNumber() + "'," +
                       "'profit': " + NormalizeDouble(OrderProfit(),2) + " }";
                       
      
      
      } 
      else
         Print("OrderSelect returned the error of ",GetLastError());
    
        
      ResetLastError();
      res=WebRequest("POST","http://localhost/openorders/"+openOrderInfo,NULL,NULL,50,post,ArraySize(post),result,headers);

      if(res==-1)
      {
            Print("Error code =",GetLastError());
            Print("Get Open Orders - Server response:",CharArrayToString(result,0));
   
      }
   
  } // END for loop
       
} // End of function getAllOpenOrders()
  
// Send a comma separated list with all ticket numbers for open orders

void cleanupOpenOrders()
{
  char post[];
  char result[];
  string headers;
  int res;  
  
  string orderList = MT4user + ",";
  
  ResetLastError();
  
  int m = OrdersTotal();
  for (int i=OrdersTotal()-1;i>=0; i--) {
  if(OrderSelect(i, SELECT_BY_POS )==true) 
  {
       orderList = orderList + OrderTicket();
       if (i > 0) orderList = orderList + ","; 
      
  }
      else
         Print("OrderSelect returned the error of ",GetLastError());
  }
       
   ResetLastError();
   res=WebRequest("POST","http://localhost/cleanuporders/"+orderList,NULL,NULL,50,post,ArraySize(post),result,headers);

   if(res==-1)
        {
         Print("Error code =",GetLastError());
         Print("Cleanup-Server response:",CharArrayToString(result,0));

        }
   else
   {
        // Print("Server response:",CharArrayToString(result,0));
   }     

}



void OnTick(void)
{


   
}  

void handleQueue()
{

   char post[];
   char result[];
   string headers;
   int res;  
   
   Print("Timer Event");
   
   // Read event queue from website
   ResetLastError();
   res=WebRequest("POST","http://localhost/getqueue/read",NULL,NULL,50,post,ArraySize(post),result,headers);

   if(res==-1)
   {         
       Print("Event Queue - Server response:",CharArrayToString(result,0), "Error=",GetLastError());

   }
   else
   {
         
         if(StringCompare( CharArrayToString(result,0),"OK") != 0) 
         {
            
            
            string action = CharArrayToString(result,0);
            
             string sep=":";                // A separator as a character
             ushort u_sep;                  // The code of the separator character
             string thestring[];               // An array to get strings
               //--- Get the separator code
              u_sep=StringGetCharacter(sep,0);
            //--- Split the string to substrings
            int k=StringSplit(action,u_sep,thestring);
            
            
            if(thestring[0] == "C") {
            
                        Print("Action=",thestring[0]);
                        
                        Print("Ticket:",thestring[1]);
                        int x=StringToInteger(thestring[1]);
                          Print("xxx",x, "xxx");
                        if(OrderSelect(x, SELECT_BY_TICKET)==true) 
                        {
                              if(!(OrderClose(x,OrderLots(), OrderClosePrice(), 10, Blue))) {
                                    Print("Order CLOSE ERROR", OrderLots());
                                    Print(GetLastError());
                              } else {
                                 ResetLastError();
                                 res=WebRequest("POST","http://localhost/getqueue/closed",NULL,NULL,50,post,ArraySize(post),result,headers);
                              }
                              
                              
                        } else { Print("Order not found"); }
                        
                     
         } else if (thestring[0]=="B" || thestring[0]=="S") {
         
         
               double minstoplevel=MarketInfo(thestring[1],MODE_STOPLEVEL);
               double ask=SymbolInfoDouble(thestring[1],SYMBOL_ASK);
               double bid=SymbolInfoDouble(thestring[1],SYMBOL_BID);
               int ticket;
               
               
               
               //--- calculated SL and TP prices must be normalized
               double stoploss=NormalizeDouble(bid-(minstoplevel+10)*Point,Digits);
               double takeprofit=NormalizeDouble(bid+(minstoplevel+10)*Point,Digits);
               Print(stoploss);
               Print("Sending ", thestring[1]);
               if (thestring[0]=="B") {
               
                     ticket=OrderSend(thestring[1],OP_BUY,1,ask,5,stoploss,takeprofit,"My order",16384,0,clrGreen);
               }
               else {
                    ticket=OrderSend(thestring[1],OP_SELL,1,ask,5,stoploss,takeprofit,"My order",16384,0,clrGreen);
               }
                
             if(ticket<0)
              {
               Print("OrderSend failed with error #",GetLastError());
              }
             else
                   Print("OrderSend placed successfully");
         
              }
              
              
         else {
            Print("No Events in Queue");
         }
   }   
  }
}

// Send a list with all subscribed symbols and rates

void sendAllSymbols() {

char post[];
char result[];
string headers;
int res;  
int i;
double bid,ask;
string symbol;
string allSymbols = "";
string symbolList = "";

symbolList = "[";

   for(i=0;i < SymbolsTotal(true); i++) {
   
      symbol = SymbolName(i,true);
      ask=SymbolInfoDouble(symbol,SYMBOL_ASK);
      bid=SymbolInfoDouble(symbol,SYMBOL_BID);   
      
       if (i > 0) {
            allSymbols = allSymbols + ",";
            symbolList = symbolList + ",";
       }
       allSymbols = allSymbols + symbol + "," + NormalizeDouble(bid,5) + "," + NormalizeDouble(ask,5);   
       
       symbolList = symbolList +  "{'s':'"  + symbol + "'," + 
                                    "'u':'"  + MT4user + "'," + 
                                    "'b':" + NormalizeDouble(bid,5) + "," +
                                    "'a':" + NormalizeDouble(ask,5) + "}"; 
      
   }
    symbolList = symbolList + "]";
    
                           
      ResetLastError();
      
      res=WebRequest("POST","http://localhost/allsymbols/"+symbolList,NULL,NULL,50,post,ArraySize(post),result,headers);
   
      if(res==-1)
      {
            Print("Error code =",GetLastError());
            Print("Send all Symbols - Server response:",CharArrayToString(result,0));
   
      }


}

// Notify the web server if market opens or closes
void sendMarketStatus(int status) {

   char post[];
   char result[];
   string headers, strStatus;
   int res;  
   
   if(status != lastMarketStatus) {
   
         if(status == 0) {
            strStatus="closed";
         }
         else {
            strStatus="opened";
         }
         ResetLastError();
         res=WebRequest("POST","http://localhost/marketstatus/"+strStatus,NULL,NULL,50,post,ArraySize(post),result,headers);
            
         if(res==-1)
         {               
                     Print("Send market status - Server response:",CharArrayToString(result,0),"Error: ",GetLastError());
            
         } else {
            Print("Market Status Change sent to server...");
            lastMarketStatus = status;
         }
         
   }


}


void OnTimer()
{
   Print("Timer Event");
   // Market is open
   
  
         sendMarketStatus(1);
         handleQueue();
         cleanupOpenOrders();
      	getAllOpenOrders();
         sendAccountInfo();
         sendAllSymbols();
         
   
   
}

