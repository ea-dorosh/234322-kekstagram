'use strict';

// error.js модуль, который показывает сообщение при успешной загрузке

(function () {

  var errorElement = document.querySelector('#error').content.querySelector('.error');

  var showErrorMessage = function (text) {
    window.util.main.appendChild(errorElement);
    errorElement.querySelector('.error__title').textContent = text;
    document.addEventListener('keydown', window.util.onMessageEscPress);
    errorElement.addEventListener('click', window.util.closeMessage);
  };

  var onError = function (error) {
    window.form.closeForm();
    showErrorMessage(error);
  };

  window.error = {
    onError: onError
  };

})();
