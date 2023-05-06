import {fetchClient} from "../../utils.js";

export const initLogin = () => {

    const form = document.querySelector("form");
    form.onsubmit = handleSubmit;
};

async function  handleSubmit(e) {
    e.preventDefault();

    const body = fetchInputValues();

    const res = await fetchClient.post("/auth/login", body);
    
    if (localStorage) {
        localStorage.setItem("token", res.token);
    } else {
        console.log("Local storage not available");
    }
    

    window.router.navigate("/booklists");
};



function fetchInputValues() {

    const usernameInput = document.getElementById("input-username").value;
    const passwordInput = document.getElementById("input-password").value;

    return {
        username: usernameInput,
        password: passwordInput,
    };
};