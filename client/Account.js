
Meteor.subscribe("accountinfo");
Meteor.subscribe("currentrates");
Meteor.subscribe("tradequeue");

Meteor.subscribe("symbols");
Meteor.subscribe("marketstatus");
Meteor.subscribe("newtrades");



Template.Account.helpers (
{
	
	  profitTheme: function() {

	  		var x = AccountInfo.findOne({}).profit;

	  		if ( x >= 0 ) {

	  			return "profit-green";
	  		} else {
	  			return "profit-red";
	  		}


	  },

	  profit: function() {

      var x = AccountInfo.findOne({}).profit;      
			if(x !== undefined) {
        return AccountInfo.findOne({}).profit;
      }
      else {

        return "Unknown";
      }
		  
    },
    balance: function() {
            
      return AccountInfo.findOne({}).balance;
    },
    equity: function() {
            
      return AccountInfo.findOne({}).equity;
    },
    freemargin: function() {
            
      return  AccountInfo.findOne().freemargin;
      
    },
    company: function() {
            
      return AccountInfo.findOne({}).company;
    },
    number: function() {
            
      return AccountInfo.findOne({}).number;
    },
    server: function() {
            
      return AccountInfo.findOne({}).server;
    },
    currency: function() {
            
      return AccountInfo.findOne({}).currency;

    },
    marketstatus: function() {
      return marketStatus.findOne({}).status;

    }
  
 	
    

		
});




