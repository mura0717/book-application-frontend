import Slicer from "./models/Slicer.js";
export const initBooks = () => {
  const ele = document.getElementById("book_cards");
  const moreContent = document.getElementById("more_btn");
  new Slicer(ele, moreContent);
};
