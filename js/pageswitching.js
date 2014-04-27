$(document).ready(function() {
    var source = $("#index").html();
    $("#container").append(source);
    $("#count").click(function(){
        $("#container").empty();
        var counting = $("#counting-container").html();
        $("#container").prepend(counting);
        $("li").removeClass("active");
        $(this).addClass("active");
        loadCount();
    });

    $("#strategy").click(function(){
        $("#container").empty();
        var strategy = $("#strategy-container").html();
        $("#container").prepend(strategy);
        $("li").removeClass("active");
        $(this).addClass("active");
        loadStrategy();
    });

    $("#login").click(function(){
        $('#container').empty();
        var login = $('#login-container').html();
    });


    $("#stats").click(function() {
        $("li").removeClass("active");
        $(this).addClass("active");
        $.get("/highscore/10", function(data) {
            var users =  new Array();
            data.forEach(function(user) {
                users.push(user);
            });
            var templateUsers = { userObj: users }
            var scores = $("#scores-container").html();

            var scoresTemplate = Handlebars.compile(scores);
            var scoresHTML = scoresTemplate(templateUsers);
            $("#container").empty();
            $("#container").prepend(scoresHTML);
            console.log(templateUsers);
        });
    });

    $("#chat").click(function() {
        $("li").removeClass("active");
        $(this).addClass("active");
        var chat = $("#chat-container").html();
        $("#container").empty();
        $("#container").prepend(chat);
    })
});

var clearActives = function() {

}