const myButton = document.querySelector(".sign-in");
const login_form = document.querySelector(".login-form");
const overlay = document.querySelector("#overlay");
const cancel = document.querySelector(".cancel-button");
const pass_button = document.querySelector("#toggle-password");
const eye_open = document.querySelector("#eye-open");
const eye_closed = document.querySelector("#eye-closed");
const show_password = document.getElementById("password-form")
const login_button = document.getElementById("login-button")
const email_submission = document.getElementById("email-form")
const password_submission = document.getElementById("password-form")
const error_message = document.getElementById("login-error")
const email_error = document.getElementById("email-error")
const empty_error = document.getElementById("empty-error")
let seePassword = false


// opening the login form and bluring the background if called
function loggedIn(){
    myButton.textContent = "My Profile";
    login_form.style.display = "inline-block";
    login_form.classList.add("active");
    overlay.classList.add("active");
}

function passwordEye() {
    seePassword = !seePassword
    if (seePassword === true){
        eye_open.classList.add("active")
        eye_closed.classList.add("active")
        show_password.type = "text"

    }
    else{
        eye_open.classList.remove("active")
        eye_closed.classList.remove("active")
        show_password.type ="password"
    }
}

function sendDetails(email, password) {
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"   // assigning JSON file
        },
        body: JSON.stringify({    // converts our email and password into a JSON string
            email: email,
            password: password})
    })
    .then(response => response.json()) //
    .then(data =>{ // data is now the response json sent by Python
        if (data.success === true){
            login_form.classList.remove("active");
            overlay.classList.remove("active");
            empty_error.classList.remove("active");
        }// gets the success key and sees if its true or false

        else if (data.success === "error"){
            email_error.classList.add("active");
            error_message.classList.remove("active");
            empty_error.classList.remove("active");
        }

        else if (data.success === "None"){
            empty_error.classList.add("active");
            error_message.classList.remove("active");
            email_error.classList.remove("active");
        }

        else{
            error_message.classList.add("active");
            email_error.classList.remove("active");
            empty_error.classList.remove("active");
        }
    })
}


function getLogin() {
    const email = email_submission.value
    const password = password_submission.value
    sendDetails(email, password)
}



// close the login page if called
function closeLogin(){
    login_form.classList.remove("active");
    overlay.classList.remove("active");
}

function enterKey(event){
    if (event.key === "Enter"){
        event.preventDefault();  // stops the login page from closing
        getLogin()  // instead calls getLogin function
    }
}

// calling the functions

email_submission.addEventListener("keydown", enterKey)
password_submission.addEventListener("keydown", enterKey)
myButton.addEventListener("click", loggedIn)
login_button.addEventListener("click", getLogin)
pass_button.addEventListener("click", passwordEye)
overlay.addEventListener("click", closeLogin)
cancel.addEventListener("click", closeLogin)