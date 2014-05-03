var express = require('express');
var pg = require('pg');
var bcrypt = require('bcryptjs');
var http = require('http');
var app = express();
var server = http.createServer(app);
var param = { host: 'ec2-54-204-31-33.compute-1.amazonaws.com', user: 'klwtcpzgmsaemn', password: 'lXQSJDtOudAvUhhaEJ-Ha4-Lra', database: 'd66b9oqhlet7me', ssl: true}
//var conString = "postgres://klwtcpzgmsaemn:lXQSJDtOudAvUhhaEJ-Ha4-Lra@ec2-54-204-31-33.compute-1.amazonaws.com:5432/d66b9oqhlet7me"

var RES_DENIED = "denied";
var RES_SUCCESS = "success";
var RES_FAIL = "fail";
var RES_DUPLICATE_USER = "duplicate";


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
                throw err;
            }
            result.rows.forEach(function(row) {
                UserList.users[row['user_name']] = {
                    password: row['password'],
                    id: row['user_id']
                };
            }); 
        });
    },

    /*
     * Callback after function is complete. Takes two arguments, err and res.. True if function is completed, err if not.  
     */
    addUser: function(user, pass, callback) {

        if(UserList.users[user] !== undefined) {
            return callback(new Error("User Already Exists"));
        } else {
            bcrypt.hash(pass, 12, function(err, hash) {
                if(err) {
                    return callback(err);
                } else {
                    var queryConf = {
                        text: "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING user_id",
                        values: [user, hash]
                    };
                    client.query(queryConf, function(err, result) {
                        if(err) {
                            return callback(err);
                        } else {
                            UserList.users[user] = {
                                password: hash,
                                id: result.rows[0].user_id
                            };
                            return callback(null, true);
                        }
                    });
                }
            });
        }
    },
    

    removeUserAdmin: function(user, callback) {
        var queryConf = {
            text: "DELETE FROM users WHERE user_name=$1",
            values: [user] 
        };
        client.query(queryConf, function(err, result) {
            if(err) {
                return callback(err);
            } else {
                delete UserList.users[user];
                return callback(null, true);
            }
        });
    },

    removeUser: function(user, pass, callback) {
        UserList.checkPassword(user, pass, function(err, res) {
            if(err) {
                return callback(err);
            } else if(res) {
                UserList.removeUserAdmin(user, callback);
            } else {
                return callback(new Error("Invalid password"));
            }
        });

    },

    /*
     * Callback with two arguments, err and res. res===true if correct password, false otherwise
     */
    checkPassword: function(user, pass, callback) {
      try{
        bcrypt.compare(pass, UserList.users[user]['password'], callback);
      } catch (err) {
        return callback(err);
      }
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
                throw err;
            }
            result.rows.forEach(function(row) {
                ScoreList.scores.push({
                    username: row['user_name'],
                    score: row['score'],
                    date: row['score_date']
                });
            });
        });
    },

    addScore: function(user, score, callback) {
        var userId = UserList.users[user]['id'];
        ScoreList.updateScore(user, score, function(err, res) {
            if(res) {
                return callback(null, res);
            } else {
                var queryConf = {
                    text: "INSERT INTO scores (userid, score) VALUES ($1, $2) RETURNING scoreid",
                    values: [userId, score] 
                };
                client.query(queryConf, function(err, result) {
                    if(err) {

                        return callback(err);
                    }

                    ScoreList.scores.push({
                        username: user,
                        score: score,
                        date: new Date() 
                    });
                    ScoreList.scores.sort(function(a, b) {
                        return b.score - a.score;
                    });

                    return callback(null, true);
                });
            }
        });
        
    },

    updateScore: function(user, score, callback) {
        var index = ScoreList.findScoreIndexByUser(user);
        if(index === -1) {
            return callback(new Error("User not found"));
        }
        var userId = UserList.users[user]['id'];
        var queryConf = {
            text: "UPDATE scores SET score=$1 WHERE userid=$2",
            values: [score, userId] 
        };
        client.query(queryConf, function(err, result) {
            if(err) {
                return callback(err);
            }
            ScoreList.scores[index].score = score;
            ScoreList.scores.sort(function(a, b) {
                return b.score - a.score;
            });
            return callback(null, true);
        });
    },

    removeScore: function(user, callback) {
        var index = ScoreList.findScoreIndexByUser(user);
        if(index === -1) {
            return callback(new Error("User has no score"));
        }
        var userId = UserList.users[user]['id'];
        var queryConf = {
            text: "DELETE FROM scores WHERE userid=$1",
            values: [userId] 
        };
        client.query(queryConf, function(err, result) {
            if(err) {
                return callback(err);
            }
            ScoreList.scores.splice(index, 1);
            return callback(null, true);
        });
    },

    getScore: function(user) {
        var index = ScoreList.findScoreIndexByUser(user);
        if(index === -1) {
            return false;
        }
        return ScoreList.scores[index].score;
    },

    findScoreIndexByUser: function(user) {
        for(var i = 0; i < ScoreList.scores.length; i++) {
            if(ScoreList.scores[i].username === user) {
                return i;
            }
        }
        return -1;
    },

    topNScores: function(n) {
        return ScoreList.scores.slice(0, n);
    }
}

module.exports = {
    UserList: UserList,
    ScoreList: ScoreList
};


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
    res.send(RES_DENIED);
  }
}
 
app.post('/login', function(request, response) {
 
    var username = request.body.username;
    var password = request.body.password;

    if(username === undefined || password === undefined) {
        response.send(RES_FAIL);
    }
    UserList.checkPassword(username, password, function(err, res)
    {
        if(res) {
            request.session.regenerate(function() {
                request.session.user = username;
                response.send(RES_SUCCESS);
            });
        } else {
            response.send(RES_FAIL);
        }
    })
});
 
app.post('/register', function(request, response) {
 
    var username = request.body.username;
    var password = request.body.password;
    if(username === undefined || password === undefined) {
        response.send(RES_FAIL)
    }
    if(UserList.users[username] !== undefined) {
        response.send(RES_DUPLICATE_USER);
    }
    UserList.addUser(username, password, function(err, res){
        request.session.regenerate(function(){
            request.session.user = username;
            if(err) {
                response.send(RES_FAIL);
            } else {
                response.send(RES_SUCCESS);
            }
        });
    });
});
 
app.get('/logout', function(request, response){
    request.session.destroy(function(){
        response.redirect('/');
    });
});
 

app.get('/highscore/:num', function(request, response) {
    response.send(ScoreList.topNScores(request.param("num")));
});

app.post('/highscore/', restrict, function(request, response) {
  var score = request.body.score;
  ScoreList.addScore(request.session.user, score);
});

app.get('/', function(req, res){
    res.redirect("/index.html");
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Listening on " + port);
});

var chatServer = require('./modules/chat_server');
chatServer.listen(server);