import { fetchClient } from "../utils.js";

export const ensureProtectedRoute = async (done) => {
  if (!localStorage.getItem("token")) {
    router.navigate("/login");
    done(false);
    return;
  }
  const data = await fetchClient.getWithAuth("/auth/checkhealth");
  if (!data || data === false) {
    router.navigate("/login");
    done(false);
  } else {
    done();
  }
};

export const ensureNotLoggedIn = async (done) => {
  if (!localStorage.getItem("token")) {
    done();
  }
  const data = await fetchClient.getWithAuth("/auth/checkhealth");
  if (data && data !== false) {
    window.router.navigate("/");
    done(false);
  } else {
    done();
  }
};
