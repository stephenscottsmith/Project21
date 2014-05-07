var loggedIn = false

$(document).ready(function() {
    $("#login_form").submit(function(event){
        event.preventDefault();
        var user = $("#username").val();
        var pass = $("#passwd").val();
        var test = $.post("/login", { username: user, password: pass });
        test.done(function(data) {
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

            if (data === "success"){
                loggedIn = true;
                $("#loginNav").hide();
                $("#loginModal").modal('hide');
                $("#loginSuccessAlert").show();
                setTimeout(function() {$("#loginSuccessAlert").hide(); }, 2000);


            }
        })
        return;
    });
     $("#register_form").submit(function(event){
        event.preventDefault();
        var regUser = $("#register_name").val();
        var regPass = $("#register_pass").val();
        var test = $.post("/register", { username: regUser, password: regPass });
        test.done(function(data) {
            if (data === "success"){
                $("#registerModal").modal('hide');
                $("#registerAlert").show();
                setTimeout(function() {$("#registerAlert").hide(); }, 2000);

        }

            if (data === "fail"){
                $("#registerModal").modal('hide');
                $("#loginAlert").show();
                setTimeout(function() {$("#loginAlert").hide(); }, 2000);

            }

            if (data === "denied"){
                $("#registerModal").modal('hide');
                $("#deniedLoginAlert").show();
                setTimeout(function() {$("#deniedLoginAlert").hide(); }, 2000);

            }

            if (data === "duplicate"){
                $("#registerModal").modal('hide');
                $("#duplicateLoginAlert").show();
                setTimeout(function() {$("#duplicateLoginAlert").hide(); }, 2000);

            }
        })
        return;
    });
});
