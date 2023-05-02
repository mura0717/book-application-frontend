import { handleHttpErrors } from "../utils.js";

export default class FetchClient {
  constructor() {
    this.baseURL = "http://localhost:8080/api";
  }
  

  /**
   * Make a GET request to the targetted endpoint
   * @param {string} endpoint
   * @example const data = await fetchClient.get("/users")
   */
  async get(endpoint) {
    try {
      return await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleHttpErrors);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  /**
   * Make a POST request to the targetted endpoint
   * @param {string} endpoint
   * @param {object} body
   * @example const data = await fetchClient.post("/users", {"username": "test", "password": "1234"})
   */
  async post(endpoint, body) {
    try {
      return await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleHttpErrors);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  /**
   * Make a PATCH request to the targetted endpoint
   * @param {string} endpoint
   * @param {object} body
   * @example const data = await fetchClient.post("/users", {"username": "test", "password": "1234"})
   */
  
  async patch(endpoint, body) {
    return await fetch(`${this.baseURL}${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(handleHttpErrors)
        .catch(err => {
          console.log(err);
          return {
            message : err.message
          };
        });
  }
  

  /**
   * Make a GET request to the targetted endpoint with authorization
   * @param {string} endpoint
   * @example const data = await fetchClient.getWithAuth("/users")
   */
  async getWithAuth(endpoint) {
    if (!hasToken()) {
      console.trace("No token found");
      return;
    }
    try {
      return await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(handleHttpErrors);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  /**
   * Make a POST request to the targetted endpoint with authorization
   * @param {string} endpoint
   * @param {object} body
   * @example const data = await fetchClient.postWithAuth("/users", {"username": "test", "password": "1234"})
   */
  async postWithAuth(endpoint, body) {
    if (!hasToken()) {
      console.trace("No token found");
      return;
    }
    try {
      return await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(handleHttpErrors);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}

function hasToken() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  return true;
}
