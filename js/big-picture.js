import {generatedPhotoGallery} from './rendering-pictures.js';

const bigPicture = document.querySelector('.big-picture');
const photos = document.querySelectorAll('.picture');
const commentsList = bigPicture.querySelector('.social__comments');
const comment = bigPicture.querySelector('.social__comment');
const totalComment = bigPicture.querySelector('.comments-count');
const buttonClose = bigPicture.querySelector('#picture-cancel');

const onModalEscKeydown = function (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
};

const openModal = function () {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const renderingComments = function () {
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  const comments = bigPicture.querySelectorAll('.social__comment');
  const showCommentsCount = 5;
  let numberDisplayedComments = 0;

  commentLoader.classList.add('hidden');

  comments.forEach((commentElement, i) => {
    if (i >= showCommentsCount) {
      commentElement.classList.add('hidden');
    } else {
      numberDisplayedComments++;
    }
  });

  if (comments.length < showCommentsCount) {
    commentCount.textContent = `${comments.length} из ${totalComment.textContent} комментариев`;
  } else {
    commentCount.textContent = `${numberDisplayedComments} из ${totalComment.textContent} комментариев`;
    commentLoader.classList.remove('hidden');
  }

  const onModalCommentLoader = function () {
    const hiddenComments = Array.from(comments).filter((commentElement) => commentElement.classList.contains('hidden'));
    for (let i = 0; i < showCommentsCount; i++) {
      if (hiddenComments[i]) {
        hiddenComments[i].classList.remove('hidden');
        numberDisplayedComments++;
      }
      commentCount.textContent = `${numberDisplayedComments} из ${totalComment.textContent} комментариев`;
    }

    if(numberDisplayedComments === comments.length){
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', onModalCommentLoader);
    }
  };

  commentLoader.addEventListener('click', onModalCommentLoader);
};

const renderingBigPicture = function (i) {
  const {url, likes, comments, description} = generatedPhotoGallery[i];
  document.querySelector('.big-picture__img').getElementsByTagName('img')[0].src = url;
  document.querySelector('.likes-count').textContent = likes;
  totalComment.textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;

  const createComments = comments;

  commentsList.innerHTML = '';
  createComments.forEach(({avatar, name, message}) => {
    const commentElement = comment.cloneNode(true);
    commentElement.getElementsByTagName('img')[0].src = avatar;
    commentElement.getElementsByTagName('img')[0].alt = name;
    commentElement.getElementsByTagName('p')[0].textContent = message;
    commentsList.appendChild(commentElement);
  });
};

photos.forEach((photo, i) => {
  photo.addEventListener('click', () => {
    renderingBigPicture(i);
    openModal();
    renderingComments();
  });
});

buttonClose.addEventListener('click', () => {
  closeModal();
});
