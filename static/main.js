let myButton = document.querySelector(".sign-in");
let login_form = document.querySelector(".login-form");
let overlay = document.querySelector("#overlay")
let cancel = document.querySelector(".cancel-button")


function loggedIn(){
    myButton.textContent = "My Profile";
    login_form.style.display = "inline-block";
    login_form.classList.add('active');
    overlay.classList.add('active');
}

function closeLogin(){
    login_form.classList.remove('active');
    overlay.classList.remove('active');
}
myButton.addEventListener("click", loggedIn)
if (myButton.textContent !== "My Profile"){
    myButton.addEventListener("click", loggedIn)
} else{
    // do nothing yet on click
}
overlay.addEventListener("click", closeLogin)
cancel.addEventListener("click", closeLogin)