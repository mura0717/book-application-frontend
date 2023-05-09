import { fetchClient } from "../../../utils.js";

export default class Slicer {
  constructor(element, moreBtn) {
    this.element = element;
    this.moreButton = moreBtn;
    this.books = [];
    this.filter = null;
    moreBtn.onclick = this.nextSlice;

    this.getBooks().then(() => moreBtn.classList.remove("d-none"));
  }

  getBooks = async (reRender = false) => {
    // Show loading
    this.moreButton.textContent = "";
    this.moreButton.innerHTML = DOMPurify.sanitize(`
      <div class="spinner-border" style="width: 1.5rem; height: 1.5rem;" role="status"/>
    `);

    let url = `/books/slice`;

    if (this.filter) {
      url += `?genre=${this.filter}`;
    }
    const data = await fetchClient.get(url);
    if (!data) return;
    reRender ? (this.books = data) : this.books.push(...data);
    this.render(this.books);
  };

  nextSlice = () => {
    this.getBooks();
  };

  render = (data) => {
    const htmlString = data
      .map(
        (book) => `
        <a href="/#/book/${
          book.id
        }" class="mb-5 mb-lg-0 d-flex flex-column book_card">
            <img src="${
              book.volumeInfo.imageLinks !== null
                ? book.volumeInfo.imageLinks.thumbnail
                : "../../assets/BlankThumbnail.png"
            }" class="rounded-1 book_img"/>
            <div class="book-info rounded-1">
              <div class="fw-bold text-light">${book.volumeInfo.title}</div>
              <p>${book.volumeInfo.description}</p>
            </div>
            <div class="d-flex flex-column mt-2">
                <div class="fw-bold text-dark">${book.volumeInfo.title}</div>
                <div style="color: #565656">${book.volumeInfo.authors}</div>
                <div style="color: #808080;">${
                  book.saleInfo.retailPrice
                    ? book.saleInfo.retailPrice.amount.toFixed(2) +
                      " " +
                      book.saleInfo.retailPrice.currencyCode
                    : "Ikke til salg"
                }</div>
            </div>
        </a>
        `
      )
      .join("\n");
    this.element.innerHTML = DOMPurify.sanitize(htmlString);
    this.moreButton.innerHTML = DOMPurify.sanitize("Vis flere");
  };
}
