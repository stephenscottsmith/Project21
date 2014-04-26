$(document).ready(function() {
    var source = $("#index").html();
    $("#container").append(source);
    $("#count-cards").click(function(){
        $("#container").empty();
        var counting = $("#counting-container").html();
        $("#container").prepend(counting);
        loadCount();
    });
    $("#basic-strategy").click(function(){
        $("#container").empty();
        var strategy = $("#strategy-container").html();
        $("#container").prepend(strategy);
        loadStrategy();
    })
});