
var myPostLogout = function(){
    //example redirect after logout
    console.log("Logged out hook");
    FlowRouter.go('home');
};


AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/home',
    redirectTimeout: 4000,

    // Hooks
    onLogoutHook: myPostLogout,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,
    //postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register at Sevenpips!"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});


/*FlowRouter.triggers.enter([function(context,redirect) {
 	if(!Meteor.userId()) {
 		FlowRouter.go('home');
 	}
}]);
*/

// Page not found
FlowRouter.notFound = {
  action: function() {
  		BlazeLayout.render('MainLayout', {main: 'notfound', header: 'header', panel: 'Account', footer: 'footer'});
  }
};



FlowRouter.route('/', {

		
	name: 'home',
	action: function() {

		if(Meteor.userId()) {
			FlowRouter.go('rates');
		}
		BlazeLayout.render('MainLayout', {main: 'Guest', header: 'header', footer: 'footer'});
	}	
});



// Account Page

FlowRouter.route('/account', {

 	
	name: 'account',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'Guest', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);


// Open Trade Page


FlowRouter.route('/opentrades', {

	

	name: 'opentrades',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'OpenTrades', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);


// Account Page

FlowRouter.route('/rates', {
 	
	name: 'rates',
	action: function() {

		BlazeLayout.render('MainLayout', {main: 'Rates', header: 'header', panel: 'Account', footer: 'footer'});
	}

}

);