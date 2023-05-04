export const loginEvent = new Event("login");
export const logoutEvent = new Event("logout");

window.addEventListener("login", () => {
  const userStr = `
        <div class="dropdown nav-item">
            <i class="bi bi-person-circle h4" style="cursor: pointer;" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu dropdown-menu-end">
                <li class="dropdown-item" style="cursor: pointer;">
                    <i class="bi bi-list-check"></i>
                    <a style="text-decoration: none;" class="text-dark" href="/#/booklists">Mine boglister</a>
                </li>
                <li class="dropdown-item d-flex flex-row" style="cursor: pointer;" id="logout_btn">
                    <i class="bi bi-box-arrow-left"></i>
                    <div href="/" style="text-decoration: none; padding-left: 6px;" class="text-danger">Logout</div>
                </li>
            </ul>
        </div>
    `;
  document.getElementById("nav-buttons").innerHTML =
    DOMPurify.sanitize(userStr);

  document.getElementById("logout_btn").onclick = () => {
    window.dispatchEvent(logoutEvent);
    window.router.navigate("/");
  };
});

window.addEventListener("logout", () => {
  const btnStr = `
        <li class="nav-item">
            <a
            class="px-2 py-2 py-md-1 rounded-1 text-light nav-link bg-dark"
            style="font-size: 14px"
            href="/login"
            data-navigo
            >Login</a
            >
        </li>
        <li class="nav-item mx-2">
            <a
            class="px-2 py-2 py-md-1 rounded-1 text-light nav-link bg-primary"
            style="font-size: 14px"
            href="/signup"
            data-navigo
            >Opret</a
            >
        </li>
    `;
  document.getElementById("nav-buttons").innerHTML = DOMPurify.sanitize(btnStr);
  localStorage.removeItem("token");
});
