Meteor.publish("accountinfo", function() {

	return AccountInfo.find();

});

Meteor.publish("openorders", function() {

	return OpenOrders.find();

});

Meteor.publish("currentrates", function() {

	return currentRates.find();

});

Meteor.publish("tradequeue", function() {

	return tradeQueue.find();

});


Meteor.publish("symbols", function() {

	return Symbols.find();

});

Meteor.publish("marketstatus", function() {

	return marketStatus.find();

});

Meteor.publish("newtrades", function() {

	return newTrades.find();

});

