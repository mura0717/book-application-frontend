import {fetchClient} from "../../utils.js";
import {login} from "../../shared/users/bookUsers.js";


export const initSignup = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSignUp;
};

async function handleSignUp(e) {
    
    e.preventDefault();

    const body = fetchInputValues();

    if (!isValidEmail(body.email)){
        handleErrorModal("Please enter a valid email.")
        return;
    }

    try{
        const response = await fetchClient.post("/user-with-role", body)

        if (response){
            showSuccessModal();
            addLoginEventListener(body.username, body.password);
            
        } else { 
            handleErrorModal("Sign up failed. Try again.");
            clearForm();
        }

    } catch (error) {
        const responseMessage = error?.message;
        console.log(responseMessage)
        let errorMessage = "Sign up failed.";

        if (responseMessage.includes("This username is taken")) {
            errorMessage = "This user name is already taken.";
        } else if (responseMessage.includes("email already exists")) {
            errorMessage = "This email is already registered.";
        }

        handleErrorModal(errorMessage);
        clearForm();
    }
}
   
function fetchInputValues() {

    const usernameInput = document.getElementById("input-username").value;
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
    };
};

function showSuccessModal(){

    const modal = new bootstrap.Modal(document.getElementById("signUp-modal"));
    modal.show();

    
}

function addLoginEventListener(username, password) {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", async () => {
        login(username, password);
        window.router.navigate("/");
});
}


function handleErrorModal(errorMessage){

    const modal = new bootstrap.Modal(document.getElementById("error-modal"));
    const modalTitle = document.querySelector("#error-modal .modal-title");
    const modalBody = document.querySelector("#error-modal .modal-body");

    modalTitle.textContent = "Error";
    modalBody.innerHTML = `<p>${errorMessage}</p>`;
    modal.show();

}

function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

  function clearForm(){
    const form = document.getElementById("form");
    form.reset();
}