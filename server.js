var express = require('express');
var pg = require('pg');
var app = express();
var param = { host: 'ec2-54-204-31-33.compute-1.amazonaws.com', user: 'klwtcpzgmsaemn', password: 'lXQSJDtOudAvUhhaEJ-Ha4-Lra', database: 'd66b9oqhlet7me', ssl: true}
//var conString = "postgres://klwtcpzgmsaemn:lXQSJDtOudAvUhhaEJ-Ha4-Lra@ec2-54-204-31-33.compute-1.amazonaws.com:5432/d66b9oqhlet7me"

var client = new pg.Client(param);
client.connect(function (err) {
	if(err) {
		throw "Cannot connect to Postgres: " + err;
		//return console.error("could not connect to postgres", err);
	}
});

var UserList = {
	users: {},
	initializeUserList: function(){
		client.query("SELECT * FROM users", function(err, result) {
			result.rows.forEach(function(row) {

				UserList.users[row['user_name']] = {password: row['password']};
			})
		});
	},

	/*
	 * Returns false if the user already exists in the database. This needs to be handled.
	 */
	addUser: function(user, pass, callback) {

		if(UserList.users[user] !== undefined) {
			return false;
		}
		var queryConf = {
			text: "INSERT INTO users (user_name, password) VALUES ($1, $2)",
			values: [user, pass]};
		client.query(queryConf, function(err, result) {
			UserList.users[user] = {password: pass};
			callback();
		});
	},

	removeUser: function(user, pass) {
		if(UserList.users[user] === undefined || UserList.users[user]['password'] !== pass)
		{
			console.log();
			return false;
		}
		var queryConf = {
			text: "DELETE FROM users WHERE user_name=$1",
			values: [user]};
		client.query(queryConf, function(err, result) {

			delete UserList.users[user];
		})
	}
}


UserList.initializeUserList();



app.configure(function(){
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


 
app.use(express.bodyParser());
app.use(express.cookieParser('shhhh, very secret'));
app.use(express.session());
 
 
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}
 
app.get('/login', function(request, response) {
   response.send('<form method="post" action="/login">' +
  '<p>' +
    '<label>Username:</label>' +
    '<input type="text" name="username">' +
  '</p>' +
  '<p>' +
    '<label>Password:</label>' +
    '<input type="text" name="password">' +
  '</p>' +
  '<p>' +
    '<input type="submit" value="Login">' +
  '</p>' +
  '</form>');
});
 
app.post('/login', function(request, response) {
 
    var username = request.body.username;
    var password = request.body.password;

 	
/*    if(username == 'demo' && password == 'demo'){
        request.session.regenerate(function(){
        request.session.user = username;
        response.redirect('/restricted');
        });
    }*/
    if(UserList.users[username]['password'] === password) {
    	request.session.regenerate(function() {
        	request.session.user = username;
        	response.redirect('/restricted');
        });
    }
});

app.get('/register', function(request, response) {
   response.send('<form method="post" action="/register">' +
  '<p>' +
    '<label>Username:</label>' +
    '<input type="text" name="username">' +
  '</p>' +
  '<p>' +
    '<label>Password:</label>' +
    '<input type="text" name="password">' +
  '</p>' +
  '<p>' +
    '<input type="submit" value="Register">' +
  '</p>' +
  '</form>');
});
 
app.post('/register', function(request, response) {
 
    var username = request.body.username;
    var password = request.body.password;
    if(UserList.users[username] !== undefined) {
    	response.send('You are already registered! click <a href="/login">here to login</a>');
    }
    UserList.addUser(username, password, function(){
    	request.session.regenerate(function(){
        	request.session.user = username;
        	response.redirect('/restricted');
        });
    });
});
 
app.get('/logout', function(request, response){
    request.session.destroy(function(){
        response.redirect('/');
    });
});
 
app.get('/restricted', restrict, function(request, response){
  response.send('This is the restricted area! Hello ' + request.session.user + '! click <a href="/logout">here to logout</a>');
});

app.get('/', function(req, res){
    res.redirect("/index.html");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
