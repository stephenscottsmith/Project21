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

<<<<<<< HEAD

=======
>>>>>>> 1ae8ad4b0d16f97159df7b24ccfd3b1547d83ee1
    $("#login").click(function(){
        $('#container').empty();
        var login = $('#login-container').html();
    });
<<<<<<< HEAD

=======
    $("#chat").click(function() {
        $("li").removeClass("active");
        $(this).addClass("active");
        var chat = $("#chat-container").html();
        $("#container").empty();
        $("#container").prepend(chat);
    })
>>>>>>> 1ae8ad4b0d16f97159df7b24ccfd3b1547d83ee1

    $("#stats").click(function() {
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
});

var clearActives = function() {

}