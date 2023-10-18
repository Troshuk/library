import { books } from "./libraryData.js";
import {
  createFormMarkup,
  createPreviewMarkup,
  renderLibrary,
} from "./markups.js";

const firstDiv = document.createElement("div");
firstDiv.classList.add("leftDiv");
const secondDiv = document.createElement("div");
secondDiv.classList.add("rightDiv");
document.getElementById("root").append(firstDiv, secondDiv);

const title = document.createElement("h1");
title.textContent = "Book Library";
title.style.fontSize = "40px";
const list = document.createElement("ul");
const addButton = document.createElement("button");
addButton.textContent = "Add book";
firstDiv.append(title, list, addButton);

addButton.addEventListener("click", () => saveBook());

list.addEventListener("click", ({ target }) => {
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
  secondDiv.innerHTML = createFormMarkup(book);

  document.querySelector("form").addEventListener("change", ({ target }) => {
    book[target.name] = target.value;
  });

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const bookIndex = findIndex(book.id);

    if (bookIndex !== -1) {
      books[bookIndex] = book;
    } else {
      books.push(book);
    }

    list.innerHTML = renderLibrary(books);
    secondDiv.innerHTML = createPreviewMarkup(book);
  });
}

function findIndex(bookId) {
  return books.findIndex((item) => item.id === bookId);
}

function findBook(bookId) {
  return books.find(({ id }) => id === bookId);
}

function renderPreview(target) {
  const book = findBook(target.parentNode.id);
  secondDiv.innerHTML = createPreviewMarkup(book);
}

function deleteBook(target) {
  const bookId = target.parentNode.id;
  const bookIndex = findIndex(bookId);
  books.splice(findIndex(bookId), 1);
  list.innerHTML = renderLibrary(books);

  const bookInfo = secondDiv.firstChild;

  if (bookInfo && bookInfo.dataset.id === bookId) {
    secondDiv.innerHTML = "";
  }
}

list.innerHTML = renderLibrary(books);
