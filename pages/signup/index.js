import {fetchClient} from "../../utils.js";

export const initSignup = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSignUp;
};

async function handleSignUp(e) {
    
    e.preventDefault();

    const body = fetchInputValues();
  
    const res = await fetchClient.post("/user-with-role", body);
    window.router.navigate("/login");

};

async function fetchInputValues() {

    const usernameInput = document.getElementById("input-username").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        password: passwordInput,
    };
};
