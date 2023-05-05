import {fetchClient} from "../utils.js";

export const initSignup = () => {

    const form = document.querySelector("form");
    form.onsubmit = fetchInputValues;
};

async function fetchInputValues(e) {
    
    e.preventDefault();

    const usernameInput = document.getElementById("input-username").value;
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;

    const body = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
    };
  
    const res = await fetchClient.post("/user-with-role", body);
    window.router.navigate("/login");


};
