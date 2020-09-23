$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
    $("button#sign-up").click(function() {
        var form = $("form#regForm").serializeArray();
        /*
        if any field is empty
        if email is valid
        if password == cpass
        password min characters 5
        usernames no space in between
        */
        var checks = Array(5).fill(true);

        form.forEach(e => e.value = validator.trim(e.value)) //chops off white space at the start and end of string

        form.forEach(e => {
            if(validator.isEmpty(e.value)){
                checks[0] = false;
                $("span#err-register").text("All fields must be filled up.");
            }
        })

        if(!validator.isEmail(form[0].value)){
            checks[1] = false;
            $("span#err-register").text("Please enter a valid email.");
        }
            
        if(!validator.equals(form[2].value, form[3].value)){
            checks[2] = false;
            $("span#err-register").text("Passwords do not match.");
        }
            
        if(!validator.isLength(form[2].value, {min: 5})){
            checks[3] = false;

            $("span#err-register").text("Password must have 5 characters");
        }
            
        if(!!form[1].value && form[1].value.match(/\w+/g).length > 1){
            checks[4] = false;

            $("span#err-register").text("Username must not have any spaces.");
        }
            
        if(checks.every(Boolean)) {
            $.ajax({
                url: "/register",
                type: 'POST',
                data: form, 
                success: function(result, s) {
                    ohSnap(result.msg, {color: 'green'})
                    window.location.href ='/';      
                },
                error: function(xhr, s) {
                    ohSnap(xhr.responseJSON.msg, {color: 'red'})
                }
            })
        }
        else {
            $(".warning-div").css("display", "inline-block");
        }
    })

    $("button#login-btn").click(function() {
        var form = $("form#login-form").serializeArray();
        /**
         * if any field is empty
         */
         var checks = true;

         form.forEach(e => {
            if(validator.isEmpty(e.value)){
                checks = false;
                $("span#err-login").text("All fields must be filled up.");
            }
         })

         if(checks) {
            $.ajax({
                url: "/login",
                type: 'POST',
                data: form, 
                success: function() {
                    ohSnap("Login Successful", {color: 'green'}); 
                    window.location.href ='/';     
                },
                error: function(xhr, s) {
                    ohSnap(xhr.responseJSON.msg, {color: 'red'});
                }
            })
         }
         else {
             $(".warning-div").css("display", "inline-block");  
         }
    })

    $("button#add-list-toggle").click(function() {
        $("div#select-container").toggle();
    })

    $("button#add-review-toggle").click(function() {
        $("form#review-form").toggle();
    })

    $("button#submitGame").click(function() {
        console.log("tangina mo eugene");
        var form = $("form#addGame").serializeArray();
    
        let checks = true;
        for(let i = 0; i < 4; i++) {
            if(validator.isEmpty(form[i].value))
                checks = false;
        }
    
        if(checks) {
            var platforms = document.forms['addGame'].elements['platform[]'];
            var genres = document.forms['addGame'].elements['genre[]'];

            let cGenres = [];
            let cPlatforms = [];

            genres.forEach(e => {
                if(e.checked){
                    cGenres.push(e.value);
                }
                    
            })

            platforms.forEach(e => {
                if(e.checked){
                    cPlatforms.push(e.value);
                }
            })

            console.table(cGenres);
            console.table(cPlatforms);
        }
        else {
            ohSnap("Please fill up all fields!", {color: 'red'});
        }
    })
    
    var login = document.getElementById("login-form");

    if(login) {
        login.addEventListener("keyup", function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("login-btn").click();
            }
        })
    }
    
    var register = document.getElementById("regForm");

    if(register) {
        register.addEventListener("keyup", function(event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("sign-up").click();
            }
        })
    }
    
})