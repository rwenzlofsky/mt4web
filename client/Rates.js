// Required Session Variables
Session.set('editCurrency','');
Session.set('openPrice',0);
Session.set('tradeMode','');
editModeNewTrade = new ReactiveVar(false);
updateModeTrade = new ReactiveVar(false);

// Hook into form send to make some validations

AutoForm.hooks({
  insertNewTrade: {
    docToForm: function(doc) {

      return doc;
    },
    formToDoc: function(doc) {

      return doc;
    },
 	before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(doc) {
      // Potentially alter the doc
      console.log("Insert from Form:", doc);

      doc.direction = Session.get('tradeMode');  // Buy or Sell Order ?

      
      if((doc.tradetypes !== 'Market') && (!doc.pendingprice)) {
      		this.addStickyValidationError('pendingprice','need_price');
      		return false;
      }
      else
      {
      	
      	editModeNewTrade.set(false);

      	return doc;

      }

      //return false; (synchronous, cancel)

      // Then return it or pass it to this.result()
      //return doc; (synchronous)


      
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  }
  }
});


Template.Rates.onCreated(function() {

  var instance = this;

  instance.autorun(function () {

    
      instance.subscribe('symbols');

    });

}); 



Template.Rates.helpers (
{
	
 tradeTypes: function() {
 return [
        {label: "Market", value: "Market"},
        {label: "Pending", value: "Pending"}
    ];


 },

 
 thesymbols: function() {
      
            
      var symbols =  Symbols.find({user: Meteor.user().emails[0].address}, {sort: {symbol: 1}});

      if (symbols) {
        return symbols;    
      } else {

        return false;    
      }

    },

  updatemode: function() {

      return updateModeTrade.get();
  },

  editmode: function() {

  	//return Template.instance().editModeNewTrade.get();
  	return editModeNewTrade.get();

  },
  editsymbol: function() {

  	return Session.get('editCurrency');

  },

  openprice: function() {

  	//return Session.get('openPrice');	
  	if (Session.get('tradeMode') === 'buy') {
  		return Symbols.findOne({symbol: Session.get('editCurrency')}).ask;
  	} else {
		return Symbols.findOne({symbol: Session.get('editCurrency')}).bid;
  	}




  },
  trademode: function(theMode) {
  	if (Session.get('tradeMode') === theMode)  {
  		return true;
  	}
  	else {
  			return false;
  	}
  },

    theorders: function() {
               
      var orders =  OpenOrders.find({user: Meteor.user().emails[0].address});

      if (orders) {
        return orders;    
      } else {

        return false;    
      }

    }

 
});    

Template.Rates.events({
  
  "click .js-trade-button-buy": function (event, template) {

  	 //template.editModeNewTrade.set(true);
  	 editModeNewTrade.set(true);
  	 Session.set('editCurrency',this.symbol);
  	 Session.set('openPrice',this.ask);
  	 Session.set('tradeMode','buy');
/*

      tradeQueue.insert({
        ticket: this.symbol,
        activity: "B"
    });

*/	
    
  },
  "click .js-trade-button-sell": function (event, template) {

	  
	  //template.editModeNewTrade.set(true);
	  editModeNewTrade.set(true);
	  Session.set('editCurrency',this.symbol);
	  Session.set('openPrice',this.bid);
	  Session.set('tradeMode','sell');
  	  


   /*   tradeQueue.insert({
        ticket: this.symbol,
        activity: "S"
    });
*/
	
    
  },
  "click .js-notrade": function (event, template) {

		//template.editModeNewTrade.set(false);
		editModeNewTrade.set(false);
    
  },

  "click .js-noupdate": function (event, template) {

    //template.editModeNewTrade.set(false);
    updateModeTrade.set(false);
    
  },

  "click .js-close-button": function (event, template) {
    console.log("ID=",this.ticket);
    
    tradeQueue.insert({
        ticket: this.ticket,
        activity: "C"
    });
  },

  "click .js-change-button": function (event, template) {
    console.log("ID=",this.ticket);
    
    updateModeTrade.set(true);

    /*tradeQueue.insert({
        ticket: this.ticket,
        activity: "C"
    });*/
  },

  "mouseenter .js-hover-bid": function (event, template) {

    //console.log("Symbol=",event.target);
         
      
    
  },

    "mouseleave .js-hover-bid": function (event, template) {

    //console.log("Symbol=",event.target);
    
  }    
});
