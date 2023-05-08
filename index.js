import "https://unpkg.com/navigo";
//import "./navigo.js";
import {
  loadTemplate,
  adjustForMissingHash,
  setActiveLink,
  renderTemplate,
} from "./utils.js";

import {
  enforceProtectedRouteGuard,
  ensureNotLoggedInGuard,
} from "./auth/AuthGuards.js";

import Searcher from "./models/Searcher.js";
import "./setup/nav_setup.js";

import { initBook } from "./pages/book/index.js";
import { initBookLists } from "./pages/booklists/index.js";
import { initBooks } from "./pages/books/index.js";
import { initLogin } from "./pages/login/index.js";
import { initSignup } from "./pages/signup/index.js";
import { initBookList } from "./pages/booklist/index.js";
import { initNavLoginButtons } from "./setup/nav_setup.js";


window.addEventListener("load", async () => {
  const bookTemplate = await loadTemplate("./pages/book/index.html");
  const booksTemplate = await loadTemplate("./pages/books/index.html");
  const loginTemplate = await loadTemplate("./pages/login/index.html");
  const signupTemplate = await loadTemplate("./pages/signup/index.html");
  const booklistsTemplate = await loadTemplate("./pages/booklists/index.html");
  const booklistTemplate = await loadTemplate("./pages/booklist/index.html");

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
  await router
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
          before: (done) => enforceProtectedRouteGuard(done),
        },
      },
        "/booklist/:id": {
          as: "booklist",
              uses: (param) => {
            renderTemplate(booklistTemplate, "content");
            initBookList(param.data.id)
          },
        hooks: {
            before: (done) => enforceProtectedRouteGuard(done),
          },
      },
      "/login": {
        as: "login",
        uses: () => {
          renderTemplate(loginTemplate, "content");
          initLogin();
        },
        hooks: {
          before: (done) => ensureNotLoggedInGuard(done),
        },
      },
      "/signup": {
        as: "signup",
        uses: () => {
          renderTemplate(signupTemplate, "content");
          initSignup();
        },
        hooks: {
          before: (done) => ensureNotLoggedInGuard(done),
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
