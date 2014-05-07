
$(document).ready(function() {
    $("#login_form").submit(function(event){
        event.preventDefault();
        var user = $("#username").val();
        var pass = $("passwd").val();
        var test = $.post("/login", { username: test, password: pass });
        test.done(function(data) {
            alert(data);

            if (data === "fail"){
                $("#loginModal").modal('hide');
                $("#loginAlert").show();
            }

            if (data === "denied"){
                $("#loginModal").modal('hide');
                $("#deniedLoginAlert").show();
            }

            if (data === "duplicate"){
                $("#loginModal").modal('hide');
                $("#duplicateLoginAlert").show();
            }
        })
        return;
    });


     $("#register_form").submit(function(event){
        event.preventDefault();
        var user = $("#username").val();
        var pass = $("passwd").val();
        var test = $.post("/register", { username: test, password: pass });
        test.done(function(data) {
            alert(data);

            if (data == "success"){
                $("#loginModal").modal('hide');
                $("#registerAlert").show();
        }


            if (data === "fail"){
                $("#loginModal").modal('hide');
                $("#loginAlert").show();
            }

            if (data === "denied"){
                $("#loginModal").modal('hide');
                $("#deniedLoginAlert").show();
            }

            if (data === "duplicate"){
                $("#loginModal").modal('hide');
                $("#duplicateLoginAlert").show();
            }
        })
        return;
    });
});
