Meteor.publish("accountinfo", function() {

	return AccountInfo.find({user: currentUserId});

});

Meteor.publish("openorders", function() {

	return OpenOrders.find({user: currentUserId});

});

Meteor.publish("currentrates", function() {

	return currentRates.find({user: currentUserId});

});

Meteor.publish("tradequeue", function() {

	return tradeQueue.find({user: currentUserId});

});


Meteor.publish("symbols", function() {

	return Symbols.find({user: currentUserId});

});

Meteor.publish("marketstatus", function() {

	return marketStatus.find({user: currentUserId});

});

Meteor.publish("newtrades", function() {

	return newTrades.find({user: currentUserId});

});

Meteor.publish("forexcalendar", function() {

	return forexCalendar.find({});

});

Meteor.publish(null, function(){
  currentUserId = Meteor.user().emails[0].address;
});

