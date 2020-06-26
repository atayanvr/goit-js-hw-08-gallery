import gallery from './gallery-items.js';

const refs = {
  galleryItems: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.js-lightbox'),
  boxImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

refs.galleryItems.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.lightBox.addEventListener('click', closeModal);

function createItem(teg, className) {
  const listItem = document.createElement(teg);
  listItem.classList.add(className);

  return listItem;
}

function createLi(arr) {
  let inx = 0;
  const linkImg = arr.map(element => {
    const liItem = createItem('li', 'gallery__item');

    liItem.insertAdjacentHTML(
      'afterbegin',
      `<a class="gallery__link" href="${element.original}" >
    <img
      class="gallery__image"
      src="${element.preview}"
      data-source="${element.original}"
      data-inx="${(inx += 1)}"
      alt="${element.description}"
    />
  </a>`,
    );

    return liItem;
  });

  return linkImg;
}

function addListItemOnPage(list, items) {
  list.append(...createLi(items));
}

addListItemOnPage(refs.galleryItems, gallery);

function openModal(event) {
  event.preventDefault();

  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      refs.lightBox.classList.remove('is-open');
      refs.boxImage.src = '';
    }
  });

  if (event.target !== refs.galleryItems) {
    refs.lightBox.classList.add('is-open');

    const bigImg = event.target.dataset.source;
    refs.boxImage.src = bigImg;

    refs.boxImage.setAttribute('data-inx', event.target.dataset.inx);
  }
}

function closeModal(event) {
  if (event.target.nodeName !== 'IMG') {
    refs.lightBox.classList.remove('is-open');
    refs.boxImage.src = '';
  }
}