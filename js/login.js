
$(document).ready(function() {
    $("#login_form").submit(function(event){
        event.preventDefault();
        var user = $("#username").val();
        alert("username: " + user);
        var pass = $("#passwd").val();
        alert("password: " + pass);
        var test = $.post("/login", { username: user, password: pass });
        test.done(function(data) {
        alert("username: " + user);
       alert("password: " + pass);
            alert("data: " + data); 
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

            if (data == "success"){
                $("#loginModal").modal('hide');
                $("#loginSuccessAlert").show();
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
            alert("data: " + data); 

            if (data == "success"){
                $("#registerModal").modal('hide');
                $("#registerAlert").show();
        }

            if (data === "fail"){
                $("#registerModal").modal('hide');
                $("#loginAlert").show();
            }

            if (data === "denied"){
                $("#registerModal").modal('hide');
                $("#deniedLoginAlert").show();
            }

            if (data === "duplicate"){
                $("#registerModal").modal('hide');
                $("#duplicateLoginAlert").show();
            }
        })
        return;
    });
});
