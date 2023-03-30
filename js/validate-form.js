import { form, buttonSubmit, hashtag, description, editablePicture } from './global-constants.js';
import { zoomInitial, addListenerScalesControl, removeListenerScalesControl, initLevelSlider, addListenerEffects, removeListenerEffects } from './editing-picture.js';
import { pristine, pristineConfig } from './pristine-config.js';
import { showAlert, onSuccess } from './utils.js';
import { sendPhotoData } from './api.js';

const modal = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const buttonClose = form.querySelector('#upload-cancel');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onModalClose = function () {
  document.body.classList.remove('modal-open');
  modal.classList.add('hidden');
  form.removeEventListener('submit', validateForm);
  uploadFile.value = '';
  hashtag.value = '';
  description.value = '';

  if (document.querySelector('.img-upload__field-wrapper').contains(document.querySelector('.pristine-error'))) {
    document.querySelector('.pristine-error').remove();
    document.querySelector('.img-upload__submit').disabled = false;
  }

  removeListenerScalesControl();
  removeListenerEffects();

  zoomInitial();
  initLevelSlider();
};

const onFormKeydown = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== description && document.activeElement !== hashtag && !document.contains(document.querySelector('.error')) && !document.contains(document.querySelector('.success'))) {
    evt.preventDefault();
    document.addEventListener('keydown', onFormKeydown);
    onModalClose();
  }
};

const openModal = function () {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
  form.addEventListener('submit', validateForm);
  pristineConfig();

  addListenerScalesControl();
  addListenerEffects();

  zoomInitial();
  initLevelSlider();
};

const closeModal = function () {
  onModalClose();
  document.removeEventListener('keydown', onFormKeydown);
};

const blockSubmitButton = function () {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'ОБРАБАТЫВАЮ...';
};

const unblockSubmitButton = function () {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'ОПУБЛИКОВАТЬ';
};

function validateForm (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData (evt.target);
  sendPhotoData(formData)
    .then(() => {
      onSuccess();
      closeModal();
    })
    .catch(() => {
      showAlert();
    })
    .finally(unblockSubmitButton);
}

uploadFile.addEventListener('change', () => {
  openModal();
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    editablePicture.querySelector('img').src = URL.createObjectURL(file);
  }
});

buttonClose.addEventListener('click', closeModal);
