const getRandomNumber = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomUniqueNumber = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomNumber(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const getShowAlert = function () {
  const countdownTimer = 3000;
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const showErrorModal = errorModal.cloneNode(true);
  showErrorModal.getElementsByTagName('h2')[0].textContent = 'Ошибка запроса при загрузке данных';
  showErrorModal.getElementsByTagName('button')[0].remove();
  document.body.appendChild(showErrorModal);
  const removeModal = function () {
    document.body.removeChild(showErrorModal);
  };
  setTimeout(removeModal, countdownTimer);
};

const showAlert = function () {
  const errorModal = document.querySelector('#error').content.querySelector('.error');
  const showErrorModal = errorModal.cloneNode(true);
  document.body.appendChild(showErrorModal);

  const deleteModalAlert = () => document.body.removeChild(showErrorModal);

  const onAlertKeydown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      showErrorModal.addEventListener('click', deleteModalAlert);
      document.removeEventListener('keydown', onAlertKeydown);
      deleteModalAlert();
    }
  };

  const closeModalAlert = function () {
    showErrorModal.removeEventListener('click', deleteModalAlert);
    deleteModalAlert();
    document.removeEventListener('keydown', onAlertKeydown);
  };

  showErrorModal.addEventListener('click', closeModalAlert);
  document.querySelector('.error__inner').addEventListener('click', (evt) => evt.stopPropagation());

  showErrorModal.querySelector('.error__button').addEventListener('click', () => {
    closeModalAlert();
    showErrorModal.removeEventListener('click', closeModalAlert);
  });

  document.addEventListener('keydown', onAlertKeydown);
};

const onSuccess = function () {
  const success = document.querySelector('#success').content.querySelector('.success');
  const showSuccessModal = success.cloneNode(true);
  document.body.appendChild(showSuccessModal);

  const deleteModalSuccess = () => document.body.removeChild(showSuccessModal);

  const onSuccessKeydown = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      showSuccessModal.addEventListener('click', deleteModalSuccess);
      document.removeEventListener('keydown', onSuccessKeydown);
      deleteModalSuccess();
    }
  };

  const closeModalSuccess = function () {
    showSuccessModal.removeEventListener('click', deleteModalSuccess);
    deleteModalSuccess();
    document.removeEventListener('keydown', onSuccessKeydown);
  };

  showSuccessModal.addEventListener('click', closeModalSuccess);
  document.querySelector('.success__inner').addEventListener('click', (evt) => evt.stopPropagation());

  showSuccessModal.querySelector('.success__button').addEventListener('click', () => {
    closeModalSuccess();
    showSuccessModal.removeEventListener('click', closeModalSuccess);
  });

  document.addEventListener('keydown', onSuccessKeydown);
};

let timeoutId;

function debounce (callback, timeoutDelay) {
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomNumber, getRandomUniqueNumber, getShowAlert, showAlert, onSuccess, debounce };
