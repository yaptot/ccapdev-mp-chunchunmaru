$(document).ready(function() {
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
            if(validator.isEmpty(e.value)) 
                checks[0] = false;
                
        })

        if(!validator.isEmail(form[0].value)){
            checks[1] = false;
        }
            
        if(!validator.equals(form[2].value, form[3].value)){
            checks[2] = false;
        }
            
        if(!validator.isLength(form[2].value, {min: 5})){
            checks[3] = false;
        }
            

        if(!!form[1].value && form[1].value.match(/\w+/g).length > 1){
            checks[4] = false;
        }
            
        if(checks.every(Boolean)) {
            //$.post("/register", form, )
        }
        else {
            alert("hi ms are u single");
        }

    })
})