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
    .then(response => response.json())
    .then(data =>{
        if (data.success){

        }// gets the success key and sees if its true or false
        else{
            error_message.classList.add("active")
        }
    })     // data is now the response json sent by Python
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

// calling the functions
myButton.addEventListener("click", loggedIn)


login_button.addEventListener("click", getLogin)
pass_button.addEventListener("click", passwordEye)
overlay.addEventListener("click", closeLogin)
cancel.addEventListener("click", closeLogin)