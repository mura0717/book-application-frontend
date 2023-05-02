import "https://unpkg.com/navigo";

import {
  loadTemplate,
  adjustForMissingHash,
  setActiveLink,
  renderTemplate,
} from "./utils.js";

import Searcher from "./models/Searcher.js";

import { initBook } from "./pages/book/index.js";
import { initBookList } from "./pages/booklist/index.js";
import { initBooks } from "./pages/books/index.js";
import { initLogin } from "./pages/login/index.js";
import { initSignup } from "./pages/signup/index.js";

window.addEventListener("load", async () => {
  const bookTemplate = await loadTemplate("./pages/book/index.html");
  const booksTemplate = await loadTemplate("./pages/books/index.html");
  const loginTemplate = await loadTemplate("./pages/login/index.html");
  const signupTemplate = await loadTemplate("./pages/signup/index.html");
  const bookListTemplate = await loadTemplate("./pages/booklist/index.html");

  const router = new Navigo("/", { hash: true });
  window.router = router;

  // Initialize searcher
  new Searcher(
    document.getElementById("search_input"),
    document.getElementById("search_output")
  );

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
      "/booklist": () => {
        renderTemplate(bookListTemplate, "content");
        initBookList();
      },
      "/login": () => {
        renderTemplate(loginTemplate, "content");
        initLogin();
      },
      "/signup": () => {
        renderTemplate(signupTemplate, "content");
        initSignup();
      },
      "/book/:referenceId": (param) => {
        renderTemplate(bookTemplate, "content");
        initBook(param.data.referenceId);
      },
    })
    .notFound(() => renderTemplate("No page for this route found", "content"))
    .resolve();
});

window.onerror = (e) => alert(e);
