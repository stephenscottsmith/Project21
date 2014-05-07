
$(document).ready(function() {
    $("#login_form").submit(function(event){
        event.preventDefault();
        alert("testing now");
        var user = $("#username").val();
        var pass = $("passwd").val();
        var test = $.post("/login", { username: test, password: pass });
        test.done(function(data) {
            alert("data: " + data);
        })
        return;
    });
});
