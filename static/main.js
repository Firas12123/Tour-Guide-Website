let myButton = document.querySelector(".sign-in");
let login_form = document.querySelector(".login-form");

function loggedIn(){
    myButton.textContent = "My Profile";
    login_form.style.display = "inline-block";
    login_form.classList.add('active');
    login_form.classList.add('overlay');
}

function closeLogin(){
    login_form.classList.remove('active');
    login_form.classList.remvoe('overlay');
}

myButton.addEventListener("click", loggedIn)
login_form.addEventListener("click", closeLogin)