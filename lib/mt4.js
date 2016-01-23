AccountInfo = new Meteor.Collection("accountinfo");  
OpenOrders = new Meteor.Collection("openorders");  
currentRates = new Meteor.Collection("currentrates");
tradeQueue = new Meteor.Collection("tradequeue");
Symbols = new Meteor.Collection("symbols");
marketStatus = new Meteor.Collection("marketstatus");
newTrades = new Meteor.Collection("newtrades");
forexCalendar = new Meteor.Collection("forexcalendar");


tradeQueue.allow({
    insert: function (userId, doc) {
    
    return true;
    },
    update: function(userId, docs, fields, modifier){
       	return !!userId;
    },
    remove: function (userId, docs){
        return !!userId;
        
    }
    
});

newTrades.allow({
    insert: function (userId, doc) {
    
    return true;
    },
    update: function(userId, docs, fields, modifier){
       	return !!userId;
    },
    remove: function (userId, docs){
        return !!userId;
        
    }
    
});



// Create schema for adding new trades

newTradeSchema = new SimpleSchema({
	
  symbol: {
    type: String,
    label: "Symbol",
    max: 6,
    defaultValue: function() {
    	return Session.get('editCurrency');
    },
    autoform: {
    	type: "hidden"
	}    
	
  	},

  volumen: {
    type: Number,
    decimal: true,
    label: "Volumen",
    min: 0.0,
    max: 100.0
  },

  stoploss: {
  	type: Number,
  	decimal: false,
  	label: "Stop Loss",
  	optional: true,
  	min: 0,
  	max: 1000
  },
  
  takeprofit: {
  	type: Number,
  	decimal: false,
  	label: "Take Profit",
  	optional: true,
  	min: 0,
  	max: 1000
  },


  comment: {
    type: String,
    label: "Comment",
    max: 200,
    optional: true
  },

  tradetypes: {
	    type: String,    
	    max: 20,
	    label: "Order Types",
	    allowedValues: ['Market', 'Limit', 'Stop'],

		autoform: {
				   	type: "select-radio-inline",
				      options: function () {
				        return [
				          {label: "Market", value: "Market"},
				          {label: "Limit", value: "Limit"},
				          {label: "Stop", value: "Stop"}
				        ];
				     },
				    
					
    	 		}

		  },

   maxdevpoints: {
  	type: Number,
  	decimal: false,
  	optional: true,
  	min: 0,
  	max: 10,
  	label: "Max. Deviation",
  },

  pendingprice: {
  	type: Number,  
  	decimal: true,	
  	optional: true,
  	label: "Price"



  },

  direction: {
  	type: String,
    label: "Direction",
    optional: true,
	autoform: {
          type: 'hidden'
        }
  }


});

newTrades.attachSchema(newTradeSchema);



// Error messages for validation

SimpleSchema.messages({
  need_price: "Pending orders require a price",
  minString: "[label] must be at least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  minNumber: "[label] must be at least [min]",
  maxNumber: "[label] cannot exceed [max]",
  minDate: "[label] must be on or after [min]",
  maxDate: "[label] cannot be after [max]",
  badDate: "[label] is not a valid date",
  minCount: "You must specify at least [minCount] values",
  maxCount: "You cannot specify more than [maxCount] values",
  noDecimal: "[label] must be an integer",
  notAllowed: "[value] is not an allowed value",
  expectedString: "[label] must be a string",
  expectedNumber: "[label] must be a number",
  expectedBoolean: "[label] must be a boolean",
  expectedArray: "[label] must be an array",
  expectedObject: "[label] must be an object",
  expectedConstructor: "[label] must be a [type]",
  regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
  keyNotInSchema: "[key] is not allowed by the schema"
});


