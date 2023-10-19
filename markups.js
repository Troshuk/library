const delayNotificationSeconds = 10;

const firstDiv = document.createElement("div");
export const secondDiv = document.createElement("div");
const notificationsElement = document.createElement("div");
const title = document.createElement("h1");
const list = document.createElement("ul");
const addButton = document.createElement("button");

firstDiv.classList.add("leftDiv");
secondDiv.classList.add("rightDiv");
title.textContent = "Book Library";
title.style.fontSize = "40px";
addButton.textContent = "Add book";
notificationsElement.classList.add("notifications");

document
  .getElementById("root")
  .append(notificationsElement, firstDiv, secondDiv);
firstDiv.append(title, list, addButton);

notificationsElement.addEventListener("click", ({ target }) => {
  if (target.nodeName === "BUTTON") {
    target.parentNode.classList.add("removed");
  }
});

export function createFormMarkup({
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

export function createPreviewMarkup({ id, title, author, img, plot }) {
  secondDiv.innerHTML = `<div data-id='${id}'>
        <h2>${title}</h2>
        <p>${author}</p>
        <img src='${img}' alt='${title}'>
        <p>${plot}</p>
    </div>`;
}

export function renderLibrary(books) {
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

function renderNotification(text) {
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("notification");
  notificationElement.innerHTML = `<button>X</button><p>${text}</p>`;

  return notificationElement;
}

export function createNotification(text) {
  const notificationElement = notificationsElement.insertAdjacentElement(
    "beforeend",
    renderNotification(text)
  );

  setTimeout(() => {
    notificationElement.classList.add("removed");
  }, delayNotificationSeconds * 1000);

  notificationElement.addEventListener("transitionend", ({ target }) => {
    target.remove();
  });
}
