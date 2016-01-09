Meteor.autorun(function () {
  if (!Meteor.userId()) {
     FlowRouter.go('home');
     } 
});
