
Meteor.subscribe("openorders");

Template.OpenTrades.helpers (
{
	theorders: function() {
               
      var orders =  OpenOrders.find();

      if (orders) {
        return orders;    
      } else {

        return false;    
      }

    }
});


Template.OpenTrades.events({
  "click .js-close-button": function (event, template) {
    console.log("ID=",this.ticket);
    
    tradeQueue.insert({
        ticket: this.ticket,
        activity: "C"
    });
	}
 
});
