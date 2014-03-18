var express = require('express');
var app = express();
app.configure(function(){
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.get('/', function(req, res){
    res.redirect("/index.html");
};

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
}
