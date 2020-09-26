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
             console.log(form)
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

    $("#add-review-toggle").click(function() {
        $("form#review-form").toggle();
    })

    var genreInput = document.querySelector('input[name=genre]');
    var platformInput = document.querySelector('input[name=platform]');

    $("button#submitGame").click(function() {
        var form = $("form#addGame").serializeArray();
    
        let checks = true;
        form.forEach(e => {
            if(validator.isEmpty(e.value))
                checks = false;
        })

        if(checks) {
            let genres = JSON.parse(genreInput.value);
            let platforms = JSON.parse(platformInput.value);

            console.log(genres);
            console.log(platforms);

            let cGenres = [];
            let cPlatforms = [];

            genres.forEach(e => {
                let text = e.value.toUpperCase();
                cGenres.push(text);
            })

            platforms.forEach(e => {
                cPlatforms.push(e.value);
            })
            $.ajax({
                url:"/addGame",
                method:'POST',
                data: {
                    gameName: form[0].value,
                    publisher: form[1].value,
                    publishDate: form[2].value,
                    gamedesc: form[3].value,
                    genres: cGenres,
                    platforms: cPlatforms
                },
                success: function() {
                    ohSnap("Game Successfully Added!", {color: 'green'});
                },
                error: function() {
                    ohSnap("Error in adding game", {color: 'red'});
                }
            })
        }
        else {
            ohSnap("Please fill up all fields!", {color: 'red'});
        }
    })

    $(".delete-icon").click(function() {
        let id = $(this).attr("data-id");
        console.log("AJAX ID:"+id);
        $.ajax({
            url: '/deleteGame',
            method: 'post',
            data: {id},
            success: function() {
                ohSnap("Game Deleted!", {color: 'green'});
                $("div[data-id="+id+"]").remove();
            },
            error: function() {
                ohSnap("Game could not be deleted.", {color: 'red'});
            }
        })
    })
    
    if(genreInput && platformInput){
        new Tagify(genreInput);
        new Tagify(platformInput);
    }

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

function unauthorized() {
    ohSnap('Please Login!', {color:'red'});
}

function addGame() {
    let status = $("#select-status option:selected").val(); 
    console.log(status);
    let id = $("#add-list-btn").attr("data-id");

    $.ajax({
        url: '/addList/'+id,
        method: 'POST',
        data: {status: status},
        success: function() {
            ohSnap('Game successfully added to list!', {color: 'green'});
            let reviewIcon = document.createElement('i');
            reviewIcon.classList.add('fa');
            reviewIcon.classList.add('fa-edit');
            reviewIcon.classList.add('edit-icon');
            
            $("span.review-head").append(reviewIcon);
        },
        error: function() {
            ohSnap('Game could not be added to list.', {color: 'red'});
        }
    })
}

function updateStatus() {
    let status = $("#select-status option:selected").val(); 
    console.log(status);
    let id = $("#add-review").attr("data-id");

    $.ajax({
        url: '/updateStatus/'+id,
        method: 'POST',
        data: {status: status},
        success: function(result, s) {
            ohSnap(result.msg, {color: 'green'});
        },
        error: function() {
            ohSnap('Status could not be updated.', {color: 'red'});
        }
    })
}