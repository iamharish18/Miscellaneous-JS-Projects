const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // Check for Username
    if(usernameValue === ""){
        // show error and add error class
        setErrorFor(username, "Username can not be blank.");
    } else {
        setSuccessFor(username);
    }

    // Check for Email ID
    if(emailValue === ""){
        setErrorFor(email, "Email can not be blank.")
    } else {
        setSuccessFor(email);
    }

    // Check for Password 
    if(passwordValue === "" ){
        setErrorFor(password, "Password can not be blank.")
    } else if (passwordValue.length < 6 || passwordValue.length > 20){
        setErrorFor(password, "Enter password containing 6 to 20 characters only.")
    } else if(passwordValue == 'password'){
        setErrorFor(password, 'Password can not be "password".');
    } else {
        setSuccessFor(password);
    }

    // Check for Confirm Password
    if(password2Value === "") {
        setErrorFor(password2, "This field is mandatory.")
    } else if(password2Value !== passwordValue) {
        setErrorFor(password2, "Password mismatch.")
    } else{
        setSuccessFor(password2);
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control error";
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}