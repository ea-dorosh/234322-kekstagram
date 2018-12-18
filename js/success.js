'use strict';

// success.js модуль, который показывает сообщение при успешной загрузке

(function () {
  var successElement = document.querySelector('#success').content.querySelector('.success');

  var showSuccesMessage = function () {
    document.addEventListener('keydown', window.util.onMessageEscPress);
    window.util.main.appendChild(successElement);
    window.util.main.addEventListener('click', window.util.closeMessage);
  };

  var onSuccess = function () {
    window.form.closeForm();
    showSuccesMessage();
  };

  window.success = {
    onSuccess: onSuccess
  };

})();
