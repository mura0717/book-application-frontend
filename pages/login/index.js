import {login} from "../../shared/users/bookUsers.js";

export const initLogin = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSubmit;
};

async function handleSubmit(e) {
    e.preventDefault();
    const credentials = fetchInputValues();
    if(await login(credentials.username,credentials.password)){
        await window.router.navigate("/");
    }
    else{
        handleErrorModal("Login failed. Wrong username or password.")
        clearForm();
    }
};

function fetchInputValues() {

    const usernameInput = document.getElementById("input-username").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        password: passwordInput,
    };
};

function handleErrorModal(errorMessage){

    const modal = new bootstrap.Modal(document.getElementById("error-modal"));
    const modalTitle = document.querySelector("#error-modal .modal-title");
    const modalBody = document.querySelector("#error-modal .modal-body");

    modalTitle.textContent = "Error";
    modalBody.innerHTML = `<p>${errorMessage}</p>`;
    modal.show();

}

function clearForm(){

    const form = document.getElementById("form");
    form.reset();
}