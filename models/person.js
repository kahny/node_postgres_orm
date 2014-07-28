var db = require('./db');

function Person(params) {    //constructor function 
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  // console.log("Person.all()")
  db.query("SELECT * FROM people",[], function(err, res){
    var allPeople = [];
    // console.log("res.rows:");
    // console.log(res.rows);

    res.rows.forEach(function(personRow) {
      // console.log("personRow")
      // console.log(personRow)
      allPeople.push(new Person(personRow));
    });
    callback(err, allPeople);
  });
}


Person.findBy = function(key, val, callback) {

  db.query("SELECT * FROM people WHERE " + key + "=$1", [val], function(err, res){
    var foundRow, foundPerson;
    // do something here with res
    //console.log("Response", res);
    var personRow = res.rows[0]
    // console.log(res.rows[0])
    foundPerson = new Person(personRow);
    // console.log('foundPerson')
    // console.log(foundPerson)
    callback(err, foundPerson);
  });
};


Person.create = function(params, callback){
  db.query("INSERT INTO people (firstname, lastname) VALUES($1, $2)", [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    // console.log(res.rows[0 ]); //this won't return anything useful 

      newPerson = new Person({firstname: params.firstname, lastname: params.lastname});
      console.log(params.firstname);
      console.log(params.lastname);
      console.log(newPerson);

  
    callback(err, newPerson);
  });
};



Person.prototype.destroy = function(callback){
  db.query("DELETE FROM people WHERE id=$1", [this.id], function(err, res) {
    callback(err)
  });
}




Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}



module.exports = Person;
