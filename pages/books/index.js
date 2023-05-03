import Paginator from "./models/Paginator.js";
export const initBooks = () => {
  const ele = document.getElementById("book_cards");
  const nextButton = document.getElementById("next_btn");
  // const prevButton = document.getElementById("prev_btn");
  new Paginator(0, ele, nextButton);
};
