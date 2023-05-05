import { fetchClient } from "../utils.js";

export default class Searcher {
  constructor(input, output, debounceVal = 500) {
    this.output = output;
    this.input = input;
    this.sessionCache = {};
    input.addEventListener("input", debounce(this.search, debounceVal));
    input.addEventListener("focus", (e) => this.search(e));
    input.addEventListener("focusout", () => this.unrender());
    output.addEventListener("mousedown", (e) => this.bookClick(e));
  }

  search = async (e) => {
    const inputValue = e.target.value;
    if (!inputValue) return this.unrender();

    if (this.sessionCache[inputValue]) {
      return this.render(this.sessionCache[inputValue]);
    }

    const data = await fetchClient.get(`/books/search?query=${inputValue}`);
    if (!data) return this.unrender();
    this.sessionCache[inputValue] = data;
    this.render(data);
  };

  bookClick = (e) => {
    if (!e.target.dataset.bookId) return;
    this.unrender(true);
    window.router.navigate(`/book/${e.target.dataset.bookId}`);
  };

  unrender = (clearSearch = false) => {
    this.output.innerHTML = DOMPurify.sanitize();
    if (clearSearch) this.input.value = "";
    this.output.classList.remove("border_shadow");
  };

  render = (data) => {
    if (!this.output.classList.contains("border_shadow")) {
      this.output.classList.add("border_shadow");
    }
    const htmlString = data
      .map(
        (book) => `
        <div data-book-id="${
          book.id
        }" class="d-flex flex-row w-100 justify-content-between align-items-center p-2 search_book" style="cursor: pointer;">
            <div class="d-flex flex-row">
                <img style="width: 37px; height: 47px; border-radius: 2px;" src="${
                  book.volumeInfo.imageLinks
                    ? book.volumeInfo.imageLinks.smallThumbnail
                    : "../assets/BlankThumbnail.png"
                }"/>
                <div class="d-flex flex-column justify-content-between mx-2">
                    <div class="fw-bold text-dark">${
                      book.volumeInfo.title
                    }</div>
                    <div style="color: #565656;">${
                      book.volumeInfo.authors
                    }</div>
                </div>
            </div>
            <div style="color: #808080;">${
              book.saleInfo.retailPrice.amount.toFixed(2) +
              " " +
              book.saleInfo.retailPrice.currencyCode
            }</div>
        </div>
    `
      )
      .join("\n");

    this.output.innerHTML = DOMPurify.sanitize(htmlString);
  };
}

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
