Meteor.autorun(function () {
  if (!Meteor.userId()) {  	  
     FlowRouter.go('home');
     } 
});

 AutoForm.setDefaultTemplate('materialize'); 
 Template.atNavButtonCustom.replaces("atNavButton");



