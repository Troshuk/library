let books = [
  {
    id: "1",
    title: `Apple. Computer evolution`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Richly illustrated chronological guide to the history of computers in which
       and structured information about the creation and development of Apple technology against the backdrop of history
       personal computers in general.
       The book contains descriptions of dozens of the most significant models of devices from both Apple and other manufacturers,
       accompanied by a large number of original studio photographs.
       The book is intended for a wide range of readers interested in the history of electronics.
       It can also serve as a source of inspiration for designers, marketers and entrepreneurs.`,
  },
  {
    id: "2",
    title: `How to explain computer science to a child`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Illustrated encyclopedia in infographic format on technical, social and cultural aspects
       in informatics. Explains step by step how children can get the most out of computers and internet services,
       staying safe.
       The book covers everything from data storage to life on the Internet,
       from programming to computer attacks. About how computers function, about modern software
       software, the device of the Internet and digital etiquette. All concepts - from hacker to bitcoin -
       explained clearly with illustrations and diagrams.`,
  },
  {
    id: "3",
    title: `The path of the Scrum Master. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `This book will help you become an outstanding Scrum Master and achieve great results with your team.
       It is illustrated and easy to understand - you can read it in a weekend, and use the resulting
       knowledge throughout your career.
       Based on 15 years of experience, Zuzana Shokhova explains the roles and responsibilities of a Scrum Master,
       how to solve everyday tasks, what competencies are needed to become an outstanding scrum master,
       What tools does he need to use?`,
  },
];

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
  createFormMarkup(book);

  document.querySelector("form").addEventListener("change", ({ target }) => {
    book[target.name] = target.value;
  });

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const bookIndex = books.findIndex((item) => item.id === book.id);

    if (bookIndex !== -1) {
      books[bookIndex] = book;
    } else {
      books.push(book);
    }

    renderLibrary();
    createPreviewMarkup(book);
  });
}

function findBook(bookId) {
  return books.find(({ id }) => id === bookId);
}

function createFormMarkup({
  id = "",
  title = "",
  author = "",
  img = "",
  plot = "",
} = {}) {
  secondDiv.innerHTML = `<form data-id='${id}' class='save-book-form'>
        <label>Title: <input type='text' name='title' value='${title}' required></label>
        <label>Author: <input type='text' name='author' value='${author}'></label>
        <label>Image: <input type='url' name='img' value='${img}'></label>
        <label>Plot: <textarea name='plot' rows="20">${plot}</textarea></label>
        <button>Save</button>
    </form>`;
}

function createPreviewMarkup({ id, title, author, img, plot }) {
  secondDiv.innerHTML = `<div data-id='${id}'>
        <h2>${title}</h2>
        <p>${author}</p>
        <img src='${img}' alt='${title}'>
        <p>${plot}</p>
    </div>`;
}

function renderPreview(target) {
  const book = findBook(target.parentNode.id);
  createPreviewMarkup(book);
}

function deleteBook(target) {
  const bookId = target.parentNode.id;
  books = books.filter(({ id }) => id !== bookId);
  renderLibrary();

  const bookInfo = secondDiv.firstChild;

  if (bookInfo && bookInfo.dataset.id === bookId) {
    secondDiv.innerHTML = "";
  }
}

function renderLibrary() {
  list.innerHTML = books
    .map(({ id, title }) => {
      return `<li id='${id}'>
          <p class='book-title'>${title}</p>
          <button class='delete'>Delete</button>
          <button class='edit'>Edit</button>
        </li>`;
    })
    .join("");
}

renderLibrary();
