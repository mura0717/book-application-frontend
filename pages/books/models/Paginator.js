import { fetchClient } from "../../../utils.js";

export default class Paginator {
  constructor(startIndex, element, next, prev) {
    this.currPage = startIndex;
    this.element = element;
    this.nextButton = next;
    this.prevButton = prev;

    next.onclick = this.next;
    prev.onclick = this.previous;

    this.getBooks();
  }

  getBooks = async () => {
    const data = await fetchClient.get(
      `/books/pagination?startIndex=${this.currPage}`
    );
    if (!data) return;
    this.render(data);
    this.updateButtons();
  };

  next = () => {
    this.currPage += 1;
    this.getBooks();
  };

  previous = () => {
    this.currPage -= 1;
    this.getBooks();
  };

  updateButtons = () => {
    if (this.currPage === 0) this.prevButton.classList.add("disabled");
    if (this.currPage > 0 && this.prevButton.classList.contains("disabled"))
      this.prevButton.classList.remove("disabled");
  };

  render = (data) => {
    const htmlString = data
      .map(
        (book) => `
        <a href="/#/book/${
          book.id
        }" class="mb-2 mb-lg-0 d-flex flex-column book_card" >
            <img style="height: 400px;" src="${
              book.volumeInfo.imageLinks !== null
                ? book.volumeInfo.imageLinks.thumbnail
                : "../../assets/BlankThumbnail.png"
            }"/>
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
    window.scrollTo(0, 0);
  };
}
