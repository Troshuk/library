import { getBooks, setBooks } from "./libraryData.js";
import {
  createFormMarkup,
  createPreviewMarkup,
  createNotification,
  renderLibrary,
  secondDiv,
} from "./markups.js";

const addBookElement = document.querySelector("div.leftDiv button");
const bookListElement = document.querySelector("div.leftDiv ul");

addBookElement.addEventListener("click", () => saveBook());

bookListElement.addEventListener("click", ({ target }) => {
  if (target.nodeName === "LI") {
    renderPreview(target.firstElementChild);
  } else if (target.nodeName === "P") {
    renderPreview(target);
  } else if (target.classList.contains("delete")) {
    deleteBook(target);
  } else if (target.classList.contains("edit")) {
    editBook(target);
  }
});

function editBook(target) {
  const book = findBook(target.parentNode.id);
  saveBook({ ...book }, true);
}

function saveBook(
  book = { id: `${Date.now()}`, title: "", author: "", img: "", plot: "" }
) {
  createFormMarkup(book);

  const formElement = document.querySelector("form");

  formElement.addEventListener("change", ({ target }) => {
    book[target.name] = target.value;
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookIndex = findIndex(book.id);
    const books = getBooks();

    if (bookIndex !== -1) {
      books[bookIndex] = book;
      createNotification(`Book "${book.title}" has been successfully updated`);
    } else {
      books.push(book);
      createNotification(
        `New book "${book.title}" has been successfully added to the library`
      );
    }

    setBooks(books);
    createPreviewMarkup(book);
  });
}

function findIndex(bookId) {
  return getBooks().findIndex((item) => item.id === bookId);
}

function findBook(bookId) {
  return getBooks().find(({ id }) => id === bookId);
}

function renderPreview(target) {
  const book = findBook(target.parentNode.id);
  createPreviewMarkup(book);
}

function deleteBook(target) {
  const bookId = target.parentNode.id;
  const books = getBooks();
  const book = books.splice(findIndex(bookId), 1);
  setBooks(books);

  if (secondDiv?.firstChild?.dataset.id === bookId) {
    secondDiv.innerHTML = "";
  }

  createNotification(
    `Book "${book[0].title}" has been successfully removed from the library`
  );
}

renderLibrary(getBooks());
