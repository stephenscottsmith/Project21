var express = require('express');
var pg = require('pg');
var bcrypt = require('bcryptjs');
var app = express();
var param = { host: 'ec2-54-204-31-33.compute-1.amazonaws.com', user: 'klwtcpzgmsaemn', password: 'lXQSJDtOudAvUhhaEJ-Ha4-Lra', database: 'd66b9oqhlet7me', ssl: true}
//var conString = "postgres://klwtcpzgmsaemn:lXQSJDtOudAvUhhaEJ-Ha4-Lra@ec2-54-204-31-33.compute-1.amazonaws.com:5432/d66b9oqhlet7me"

var client = new pg.Client(param);
client.connect(function (err) {
	if(err) {
		throw "Cannot connect to Postgres: " + err;
	}
});

var UserList = {
	users: {},
	initializeUserList: function(){
		client.query("SELECT * FROM users", function(err, result) {
			if(err) {
				throw "Couldn't select users: " + err;
			}
			result.rows.forEach(function(row) {
				UserList.users[row['user_name']] = {password: row['password'],
													id: row['user_id']};
			})
		});
	},

	/*
	 * Callback after function is complete. Takes no arguments.  
	 */
	addUser: function(user, pass, callback) {

		if(UserList.users[user] !== undefined) {
			return false;
		}
        bcrypt.hash(pass, 12, function(err, hash) {
        	if(err) {
				throw "Couldn't hash password: " + err;
			}
            var queryConf = {
                text: "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING user_id",
                values: [user, hash]};
            client.query(queryConf, function(err, result) {
            	if(err) {
            		throw "Couldn't insert user: " + err;
            	}
                UserList.users[user] = {password: hash,
                						id: result.rows[0].user_id};
                callback();
            });
        });
	},
	removeUser: function(user, pass) {
		var result;
		UserList.checkPassword(user, pass, function(err, res) {
			if(err) {
				throw "Couldn't remove user: " + err;
			}
			if(res) {
				remvoeUserAdmin(user);
			}
		});

	},

	removeUserAdmin: function(user) {
		var queryConf = {
			text: "DELETE FROM users WHERE user_name=$1",
			values: [user]};
		client.query(queryConf, function(err, result) {
			if(err) {
				throw "Couldn't remove user: " + err;
			}
			delete UserList.users[user];
		})
	},
    /*
     * Callback with two arguments, err and res. res===true if correct password, false otherwise
     */
    checkPassword: function(user, pass, callback) {
        bcrypt.compare(pass, UserList.users[user]['password'], callback)
    }
}

var ScoreList = {
	scores: new Array(),

	initializeScoreList: function() {
		client.query("SELECT scores.score, scores.score_date, users.user_name FROM scores \
						INNER JOIN users \
							ON scores.userid = users.user_id \
						ORDER BY scores.score DESC", function(err, result) {
			if(err) {
				throw "Couldn't select scores: " + err;
			}
			result.rows.forEach(function(row) {
				ScoreList.scores.push({
					username: row['user_name'],
					score: row['score'],
					date: row['score_date']});
			});
			console.log(ScoreList.scores);
		});
	},

	addScore: function(user, score) {
		var userId = UserList.users[user]['id'];
		var queryConf = {
			text: "INSERT INTO scores (userid, score) VALUES ($1, $2) RETURNING scoreid",
			values: [userId, score] };
		client.query(queryConf, function(err, result) {
			if(err) {
				throw "Could not insert score: " + err;
			}
            ScoreList.scores.push({
            	username: row['user_name'],
				score: row['score'],
				date: row['score_date'] });

            ScoreList.scores.sort(function(a, b) {
            	return b.score - a.score;
            });
        });
	},

	topNScores: function(n) {
		return ScoreList.scores.slice(0, n);
	},
}


UserList.initializeUserList();
ScoreList.initializeScoreList();



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
 
 
function restrict(req, res, callback) {
  if (req.session.user) {
    callback();
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

    if(username === undefined || password === undefined) {
        response.send('Invalid username or password. Click <a href"/login">here to go back</a>');
    }
    UserList.checkPassword(username, password, function(err, res)
    {
        if(res === true) {
            request.session.regenerate(function() {
                request.session.user = username;
                response.redirect('/restricted');
            });
        } else {
            response.send('Invalid username or password. Click <a href="/login">here</a> to go back');
        }
    })
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
    if(username === undefined || password === undefined) {
        response.send('Invalid username or password. Click <a href="/register">here</a> to go back')
    }
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

app.get('/highscore/:num', function(request, response) {
	response.send(ScoreList.topNScores(request.param("num")));
});

app.post('/highscore/:num', restrict, function(request, response) {
  ScoreList.addScore(request.session.user, request.param("num"));
});

app.get('/', function(req, res){
    res.redirect("/index.html");
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
