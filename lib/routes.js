FlowRouter.route('/', {

	
	name: 'home',
	action: function() {
		BlazeLayout.render('MainLayout', {main: 'Guest', header: 'header', panel: 'Account', footer: 'footer'});
	}	
});



// Account Page

FlowRouter.route('/account', {

 	triggersEnter: [function(context, redirect) {
	 if(!Meteor.userId())	 {

     		redirect('/');
     }
  	}],
	name: 'account',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'Guest', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);


// Open Trade Page


FlowRouter.route('/opentrades', {

	 triggersEnter: [function(context, redirect) {
	 if(!Meteor.userId())	 {

     		redirect('/');
     }
  	}],

	name: 'opentrades',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'OpenTrades', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);


// Account Page

FlowRouter.route('/rates', {
 	triggersEnter: [function(context, redirect) {
	 if(!Meteor.userId())	 {

     		redirect('/');
     }
  	}],
	name: 'rates',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'Rates', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);