import * as User from "../../shared/users/bookUsers.js";

export const initSignup = () => {
    const form = document.querySelector("form");
    form.onsubmit = handleSignUp;
};

async function handleSignUp(e) {
    e.preventDefault();

    const credentials = fetchInputValues();

    if (!isValidEmail(credentials.email)){
        handleErrorModal("Please enter a valid email.")
        return;
    }

    const response = await User.signUp(credentials)

    if (response.status){
        showSuccessModal();
        addLoginEventListener(credentials.username, credentials.password);

    } else {
        handleErrorModal(response.message);
    }
}
   
function fetchInputValues() {
    const usernameInput = document.getElementById("input-username").value;
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        email: emailInput,
        password: passwordInput
    };
};

function showSuccessModal(){
    const modal = new bootstrap.Modal(document.getElementById("signUp-modal"));
    modal.show();
}

function addLoginEventListener(username, password) {
    const loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", async () => {
        await User.login(username, password);
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