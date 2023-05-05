import {fetchClient} from "../utils.js";

export const initLogin = () => {

    const form = document.querySelector("form");
    form.onsubmit = fetchInputValues;
};

async function fetchInputValues(e) {
    
    e.preventDefault();

    const usernameInput = document.getElementById("input-username").value;
    const passwordInput = document.getElementById("input-password").value;

    const body = {
        username: usernameInput,
        password: passwordInput,
    };
  
    const res = await fetchClient.post("/auth/login", body);
    window.router.navigate("/booklist");


};