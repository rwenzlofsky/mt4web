
//Meteor.subscribe("accountinfo");
Meteor.subscribe("currentrates");
Meteor.subscribe("tradequeue");

//Meteor.subscribe("symbols");
Meteor.subscribe("marketstatus");
Meteor.subscribe("newtrades");
Meteor.subscribe("forexcalendar");


Template.Account.onCreated(function() {

  var instance = this;

  instance.autorun(function () {

    
      instance.subscribe('accountinfo');

}); 



});

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

      	
        return AccountInfo.findOne({}).profit;
      
		  
    },
    balance: function() {
            
      return AccountInfo.findOne({}).balance;
    },
    equity: function() {
            
      return AccountInfo.findOne({}).equity;
    },
    freemargin: function() {
            
      return  AccountInfo.findOne({}).freemargin;
      
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
      return marketStatus.find({user: Meteor.user().emails[0].address}).status;

    }
  
 	
    

		
});





