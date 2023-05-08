import {login} from "../../shared/users/bookUsers.js";

export const initLogin = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSubmit;
};

async function  handleSubmit(e) {
    e.preventDefault();
    const credentials = fetchInputValues();
    if(await login(credentials.username,credentials.password)){
        await window.router.navigate("/");
    }
    else{
        console.log("Login failed")
        // TODO: Add error message
        // TODO: Maybe clear input forms
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