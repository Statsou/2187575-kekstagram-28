import {generatePhotoGallery} from './generate-photo-gallery/generate-photo-gallery.js';

const photoGallery = document.querySelector('.pictures');
const newPhoto = document.querySelector('#picture').content.querySelector('.picture');
const createPhoto = generatePhotoGallery(25);

const createGalleyFragment = document.createDocumentFragment();

createPhoto.forEach(({url, comments, likes }) => {
  const photoElement = newPhoto.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  createGalleyFragment.appendChild(photoElement);
});

photoGallery.appendChild(createGalleyFragment);
