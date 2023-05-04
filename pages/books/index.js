import Slicer from "./models/Slicer.js";
export const initBooks = () => {
  initPlaceholders();
  const ele = document.getElementById("book_cards");
  const moreContent = document.getElementById("more_btn");
  new Slicer(ele, moreContent);
};

function initPlaceholders() {
  const htmlArr = `
    <a class="mb-5 mb-lg-0 d-flex flex-column book_card">
      <div class="skeleton skeleton-image"></div>
      <div class="d-flex flex-column mt-2">
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      </div>
    </a>
  `.repeat(15);
  document.getElementById("book_cards").innerHTML = DOMPurify.sanitize(htmlArr);
}
