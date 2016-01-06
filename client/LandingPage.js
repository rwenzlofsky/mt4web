
Template.LandingPage.helpers (
{
	
		profit: function() {

      var x = AccountInfo.findOne({}).profit;    
			if(x) {
        return AccountInfo.findOne({}).profit;
      }
      else {

        return "Unknown";
      }
		  
    },
     balance: function() {
            
      return AccountInfo.findOne({}).balance;
    },
});