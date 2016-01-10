
Template.header.onRendered(function () {
 	$(".button-collapse").sideNav();
});

Template.header.events({
	"click .button-collapse": function(event,template) {
		event.preventDefault();		
		$(".button-collapse").sideNav('show');
		
	},

    'click #login-buttons-logout': function (event) {
        //add your custom logic on top of this
        FlowRouter.go('home');
       //the default behaviour should still happen from meteor
    }
	
});

Template.header.helpers (
{
	
	theUser: function() {
		
			return Meteor.user().emails[0].address;
		
	},
	showloginbutton: function() {
		
			return Meteor.user();

		
	}

});