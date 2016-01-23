
Meteor.startup(function() {

Meteor.setInterval(function() {

		var ffweb = 'http://www.forexfactory.com/ffcal_week_this.xml';
   		var xml = HTTP.call('GET', ffweb);


   		
		var result = xml2js.parseString(xml.content, function (err, result) {
			if(err) {

				console.log('Error:', err);
			}
    		

			// Iterate over event object array

			result.weeklyevents.event.forEach(function(theEvent) {
    			//console.log(theEvent);

 				forexCalendar.update({title: theEvent.title[0], date: theEvent.date[0], country: theEvent.country[0]}, 
                {$set: {
                  
                  title: theEvent.title[0],
                  country: theEvent.country[0],
                  date: theEvent.date[0],
                  time: theEvent.time[0],
                  impact: theEvent.impact[0],
                  forecast: theEvent.forecast[0],
                  previous: theEvent.previous[0]

                }}, {upsert: true}); 



			});

		});
   		

}, 6000); 

  

});


Meteor.methods({
  getUser: function () {
	
    return currentUserId;
   } ,




});