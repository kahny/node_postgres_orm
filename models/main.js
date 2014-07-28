var Person = require('./person');

var Models = {};

Models.Person = Person;
//just testing stuff
Models.Person.all(function(err, people){
  // console.log( "Output from person.all")
  // console.log(people);
});

var start = new Date();
// Models.Person.findBy("id", 1, function(err, person){
// 	var now = new Date();

// 	console.log("DONE!",  now  - start);
// })

module.exports = Models;





//main.js is executable, to be used as a debugger 
//could just require person.js 

