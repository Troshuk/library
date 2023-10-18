export const createFormMarkup = ({
  id = "",
  title = "",
  author = "",
  img = "",
  plot = "",
} = {}) => {
  return `<form data-id='${id}' class='save-book-form'>
        <label>Title: <input type='text' name='title' value='${title}' required></label>
        <label>Author: <input type='text' name='author' value='${author}'></label>
        <label>Image: <input type='url' name='img' value='${img}'></label>
        <label>Plot: <textarea name='plot' rows="20">${plot}</textarea></label>
        <button>Save</button>
    </form>`;
};

export const createPreviewMarkup = ({ id, title, author, img, plot }) => {
  return `<div data-id='${id}'>
        <h2>${title}</h2>
        <p>${author}</p>
        <img src='${img}' alt='${title}'>
        <p>${plot}</p>
    </div>`;
};

export const renderLibrary = (books) => {
  return books
    .map(({ id, title }) => {
      return `<li id='${id}'>
          <p class='book-title'>${title}</p>
          <button class='delete'>Delete</button>
          <button class='edit'>Edit</button>
        </li>`;
    })
    .join("");
};
