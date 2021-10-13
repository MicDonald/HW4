var express = require('express');
var app = express();
var mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'contacts'
});

function makeRandomName() {
  var text = "";
  var possible_lower = "abcdefghijklmnopqrstuvwxyz";
  var possible_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  text += possible_upper.charAt(Math.floor(Math.random() * possible_upper.length));

  for (var i = 0; i < Math.floor(Math.random() * 12); i++)
    text += possible_lower.charAt(Math.floor(Math.random() * possible_lower.length));

  return text;
}

function makeRandomNumber() {
  var number = "";
  var possible = "0123456789";

  for (var i = 0; i < 10; i++)
    number += possible.charAt(Math.floor(Math.random() * possible.length));

  return number;
}

function makeRandomEmail() {
  var text = "";
  var possible_lower = "abcdefghijklmnopqrstuvwxyz";
  var possible_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  text += possible_upper.charAt(Math.floor(Math.random() * possible_upper.length));

  for (var i = 0; i < Math.floor(Math.random() * 12); i++)
    text += possible_lower.charAt(Math.floor(Math.random() * possible_lower.length));

  return text;
}



app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('Root Route');
});


app.get('/add', function(req, res){
    console.log('firstName: ', req.query.firstName);
    console.log('lastName: ', req.query.lastName);
    console.log('phoneNumber: ', req.query.phoneNumber);
    console.log('email: ', req.query.email);
    console.log('university: ', req.query.university);
    console.log('major: ', req.query.major);

    connection.query(
      'INSERT INTO contacts (firstName, lastName, phoneNumber, email, university, major) VALUES(?,?,?,?,?,?)',
      [req.query.firstName, req.query.lastName, req.query.phoneNumber, req.query.email, req.query.university, req.query.major],
    );
    res.send(`Add: ${req.query.firstName}, ${req.query.lastName}`);
    
  });
 
app.get('/read', function(req, res){
    connection.query(
      `SELECT * FROM contacts`,
      function(err, results, fields) {
        console.log(results);
        res.send(results);
      }
    );
  });
 
app.get('/random', function(req, res){
    connection.query(
      'INSERT INTO contacts (firstName, lastName, phoneNumber, email, university, major) VALUES(?,?,?,?,?,?)',
      [makeRandomName(), makeRandomName(), makeRandomNumber(), makeRandomName()+'@'+makeRandomName()+'.'+makeRandomName(), makeRandomName()+' University', makeRandomName()],
    );
    res.send('Add one mysterious guy.');
  });

app.listen(3000, function(){
    console.log('Running on port 3000');
});