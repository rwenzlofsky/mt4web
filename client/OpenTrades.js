
//Meteor.subscribe("openorders");

Template.Rates.onCreated(function() {

  var instance = this;

  instance.autorun(function () {

    
      instance.subscribe('openorders');

    });

}); 



Template.OpenTrades.helpers (
{
	theorders: function() {
               
      var orders =  OpenOrders.find({user: Meteor.user().emails[0].address});

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
