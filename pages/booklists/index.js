import * as Factory from '../../shared/factories/elementFactory.js';
import * as Booklists from '../../shared/bookLists/userBookLists.js';


export const initBookLists = () => {

    const el = Factory.createDivWithText("id","classNames", "text");

    Booklists.fetchBookLists().then(setUpBookLists)
};

function setUpBookLists (){

    const populatedListsElement = document.getElementById("booklists-id");
    const booklists = Booklists.getBookLists();

    for (let i = 0; i < booklists.length; i++) {
        const booklist = booklists.at(i);
        const listElement = createListElement(booklist);
        populatedListsElement.appendChild(listElement);
    }

}

function createListElement (bookList){
    const html = `<li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">${bookList.title}</div>
                    Title
                  </div>
                  <span class="badge bg-primary rounded-pill">${bookList.listCount}</span>
            </li>`
    const el = document.createElement("div")
    el.innerHTML = html
    return el
}

/* export const initBook = (referenceId) => {
    init(referenceId).then(() => {
        setupFav(referenceId)
        setupReviewDetails()
        setupBookDetails()
      }).then(() => {
            Books.fetchRecommendations()
              .then(() => setupRecommendations())
    })
};

const init = async bookReference => {
    await Books.fetchBookDetails(bookReference)
    await BookLists.fetchBookLists()
} 

<li class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
    <div class="fw-bold">Subheading</div>
    Cras justo odio
  </div>
  <span class="badge bg-primary rounded-pill">14</span>
</li>

*/