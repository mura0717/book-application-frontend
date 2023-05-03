import fetchClient from "../../Fetcher.js";

export const initLogin = () => {

    const form = document.querySelector("form");
    form.onsubmit = fetchInputValues;
};

async function fetchInputValues(e) {
    
    e.preventDefault();

    const usernameInput = document.getElementById("input-username").value;
    const passwordInput = document.getElementById("input-password").value;

    const body = {
        email: usernameInput,
        password: passwordInput,
    };
  
    const res = await fetchClient.postWithAuth("auth/login", body);
    window.router.navigate("/booklist");


};