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
    var result = client.query("SELECT password FROM users WHERE user_name='" + username + "'");
    result.on('row', function(row) {
    	console.log(row.password);
    })
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
