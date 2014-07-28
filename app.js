var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();


app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('site/index');
});

// .all
app.get("/people", function(req, res){
  Person.all(function(err, allPeople) {
    if (!err) {
      res.render("people/index", {people: allPeople});
    } else {
      // maybe create error page with "go back" button
      console.log('There was an error!', err);
    }
  });
});


app.get("/people/new", function(req, res){
  res.render("people/new")
});

// .findBY 
app.get("/people/:id", function(req,res){
  var id = req.params.id;

  Person.findBy("id", id, function(err, foundPerson) {
    res.render("people/show", {person: foundPerson });
  });
});

app.get("/people/:id/edit", function(req,res){
  var id = req.params.id;
  Person.findBy("id", id, function(err, foundPerson){
   res.render("people/edit", {person: foundPerson });   
  })
 
});

app.post("/people", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName; 
  Person.create({firstname: firstName, lastname: lastName}, function(err, newPerson){})
  res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  console.log("deleting...")
  var id = req.params.id;
  Person.findBy('id', id, function(err, foundPerson) {
    foundPerson.destroy(function(err) {});
  }); 
  res.redirect('/people');   //this can be here or part of findby.. how come? 
});


app.put("/people/:id", function(req,res){
  console.log("editing...")
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var id = req.body.id;
  console.log(id);
  Person.findBy('id', id, function(err, foundPerson){
    foundPerson.update({firstname: firstName, lastname: lastName}, function(err, res){});
  });
  res.redirect('/people');
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});



//testing...
// app.post("/people/:id", function(req, res){
//   console.log("post...")
// });

//testing for create
// Person.create({firstname:'connie', lastname:'chang'}, function(err, newperson){} ) //take this out, testing related to people.create 

//testing for destroy
/*  Person.findBy("id",13,function(err, foundPerson){
  foundPerson.destroy(function(err){})
});
*/
