Template.header.onRendered(function () {
 	$(".button-collapse").sideNav();
});

Template.header.events({
	"click .button-collapse": function(event,template) {
		event.preventDefault();		
		$(".button-collapse").sideNav('show');
		
	}
	
});