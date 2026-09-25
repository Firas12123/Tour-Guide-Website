const sign_in = document.querySelector(".sign-in");
const login_form = document.getElementById("login-form");
const overlay = document.getElementById("overlay");
const cancel = document.querySelector(".cancel-button");
const pass_button = document.getElementById("toggle-password");
const eye_open = document.getElementById("eye-open");
const eye_closed = document.getElementById("eye-closed");
const c_eye_open = document.getElementById("c-eye-open");
const c_eye_closed = document.getElementById("c-eye-closed");
const show_password = document.getElementById("password-form")
const c_show_password = document.getElementById("c-password-form")
const login_button = document.getElementById("login-button")
const email_submission = document.getElementById("email-form")
const password_submission = document.getElementById("password-form")
const error_message = document.getElementById("login-error")
const email_error = document.getElementById("email-error")
const empty_error = document.getElementById("empty-error")
const create_account = document.getElementById("create-account")
const create_form = document.getElementById("create-form")
const create_account_cancel = document.getElementById("create-account-button")
const log_back = document.getElementById("log-back-in")
const c_toggle_password = document.getElementById("c-toggle-password")
// account creation user forms
const first_n = document.getElementById("c-first-name")
const last_n = document.getElementById("c-last-name")
const created_e = document.getElementById("c-email-form")
const created_pass = document.getElementById("c-password-form")
const create_account_button = document.getElementById("create-account-logp")
let seePassword = false
let createPassword = false

// opening the login form and bluring the background if called
function loggedIn(){
    sign_in.textContent = "My Profile";
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

function CreatepasswordEye() {
    createPassword = !createPassword
    if (createPassword === true){
        c_eye_open.classList.add("active")
        c_eye_closed.classList.add("active")
        c_show_password.type = "text"

    }
    else{
        c_eye_open.classList.remove("active")
        c_eye_closed.classList.remove("active")
        c_show_password.type ="password"
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

function getAccountDeets(){
    const first_name = first_n.value
    const last_name = last_n.value
    const user_email = created_e.value
    const user_password = created_pass.value
    saveAccount(first_name, last_name, user_email, user_password)
}

function saveAccount(first_name, last_name, user_email, user_password){
    fetch("/", {
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            user_email: user_email,
            user_password: user_password
        })
    })
}

// close the login page if called
function closeLogin(){
    login_form.classList.remove("active","no-trans", "hide");
    overlay.classList.remove("active");
    create_form.classList.remove("active", "switch")
}

function openLogin(){
    create_form.classList.add("no-trans")
    create_form.classList.remove("switch")
    create_form.offsetWidth // commits the display without transitioning
    create_form.classList.remove("no-trans")
    login_form.classList.remove("hide")
    login_form.classList.add("active")
}

function enterKey(event){
    if (event.key === "Enter"){
        event.preventDefault();  // stops the login page from closing
        getLogin()  // instead calls getLogin function
    }
}

function createAccount(){
    create_form.classList.add("switch")
    login_form.classList.remove("active")
    login_form.classList.add("hide")
}

// calling the functions
create_account_button.addEventListener("click", getAccountDeets)
log_back.addEventListener("click", openLogin)
create_account.addEventListener("click", createAccount)
email_submission.addEventListener("keydown", enterKey)
password_submission.addEventListener("keydown", enterKey)
sign_in.addEventListener("click", loggedIn)
login_button.addEventListener("click", getLogin)
pass_button.addEventListener("click", passwordEye)
c_toggle_password.addEventListener("click", CreatepasswordEye)
overlay.addEventListener("click", closeLogin)
cancel.addEventListener("click", closeLogin)
create_account_cancel.addEventListener("click", closeLogin)