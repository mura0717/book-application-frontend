import "https://unpkg.com/navigo";

import {
  loadTemplate,
  adjustForMissingHash,
  setActiveLink,
  renderTemplate,
} from "./utils.js";

import {
  ensureNotLoggedIn,
  ensureProtectedRoute,
} from "./auth/auth_handlers.js";

import Searcher from "./models/Searcher.js";
import "./setup/nav_setup.js";

import { initBook } from "./pages/book/index.js";
import { initBookLists } from "./pages/booklists/index.js";
import { initBooks } from "./pages/books/index.js";
import { initLogin } from "./pages/login/index.js";
import { initSignup } from "./pages/signup/index.js";
import { initNavLoginButtons } from "./setup/nav_setup.js";

window.addEventListener("load", async () => {
  const bookTemplate = await loadTemplate("./pages/book/index.html");
  const booksTemplate = await loadTemplate("./pages/books/index.html");
  const loginTemplate = await loadTemplate("./pages/login/index.html");
  const signupTemplate = await loadTemplate("./pages/signup/index.html");
  const booklistsTemplate = await loadTemplate("./pages/booklists/index.html");

  const router = new Navigo("/", { hash: true });
  window.router = router;

  // Initialize searcher
  new Searcher(
    document.getElementById("search_input"),
    document.getElementById("search_output"),
    400
  );

  // Handle user login visuals
  initNavLoginButtons();

  adjustForMissingHash();
  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url);
        done();
      },
    })
    .on({
      "/": () => {
        renderTemplate(booksTemplate, "content");
        initBooks();
      },
      "/booklists": {
        as: "booklists",
        uses: () => {
          renderTemplate(booklistsTemplate, "content");
          initBookLists();
        },
        hooks: {
          before: async (done) => ensureProtectedRoute(done),
        },
      },
      "/login": {
        as: "login",
        uses: () => {
          renderTemplate(loginTemplate, "content");
          initLogin();
        },
        hooks: {
          before: async (done) => ensureNotLoggedIn(done),
        },
      },
      "/signup": {
        as: "signup",
        uses: () => {
          renderTemplate(signupTemplate, "content");
          initSignup();
        },
        hooks: {
          before: async (done) => ensureNotLoggedIn(done),
        },
      },
      "/book/:bookId": (param) => {
        renderTemplate(bookTemplate, "content");
        initBook(param.data.bookId);
      },
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve();
});

window.onerror = (e) => alert(e);
