'use strict';

// form.js модуль, который работает с формой редактирования изображения.

(function () {
  var successForm = document.querySelector('#success').content.querySelector('.success');
  var errorForm = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeForm);
  };
  // функция которая открывает форму загрузки новой фотографии
  var openForm = function () {
    imageEdit.classList.remove('hidden');
    window.util.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscPress);
  };

  // функция которая закрывает форму загрузки новой фотографии
  var closeForm = function () {
    uploadFile.value = '';
    imageEdit.classList.add('hidden');
    window.util.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };

  // открываем форму редактирования изображения при действие change в форме загрузки новых фотографий
  var uploadFile = document.querySelector('#upload-file');
  var imageEdit = document.querySelector('.img-upload__overlay');
  uploadFile.addEventListener('change', function () {
    openForm();
  });

  // закрываем форму редактирования изображения мышкой
  var imageEditCloseBtn = imageEdit.querySelector('.img-upload__cancel');
  imageEditCloseBtn.addEventListener('click', function () {
    closeForm();
  });


  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function (onSucess, onError) {
      closeForm();
      if (onSucess) {
        showSuccesMessage(successForm);
      } else if (onError) {
        showErrorMessage(errorForm);
      }
    });
    evt.preventDefault();
  });

  window.form = {
    imageEdit: imageEdit,
  };

  var onMessageEscPress = function (evt) {
    window.util.onEscPress(evt, closeMessage);
  };

  var closeMessage = function () {
    var modalElement = main.querySelector('.message');
    main.removeChild(modalElement);
    document.removeEventListener('keydown', onMessageEscPress);
    main.removeEventListener('click', closeMessage);
  };

  var showSuccesMessage = function (element) {
    document.addEventListener('keydown', onMessageEscPress);
    main.appendChild(element);
    element.querySelector('.success__button').addEventListener('click', function () {
      closeMessage();
    });
    main.addEventListener('click', closeMessage);
  };

  var showErrorMessage = function (element, text) {
    main.appendChild(element);
    element.querySelector('.error__title').textContent = text;
    element.querySelector('.error__button').addEventListener('click', function () {
      closeMessage();
    });
    element.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  //
  // валидность хэштегов
  //

  // пунк ТЗ если фокус находится в поле ввода хэш-тега,
  // нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

  var hashTagsInput = document.querySelector('.text__hashtags');
  hashTagsInput.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  hashTagsInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  // пунк ТЗ если фокус находится в поле ввода комментария,
  // нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
  var descriptionTextarea = document.querySelector('.text__description');
  descriptionTextarea.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  descriptionTextarea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  // функция которая проверяет хэштеги из массива на валидность
  var checkHashTagsValidity = function () {
    var errorText = '';
    var hashTagValue = hashTagsInput.value.trim();
    if (hashTagValue !== '') {
      var hashTags = hashTagValue.toLowerCase().split(' ');


      for (var i = 0; i < hashTags.length; i++) {
        var hashTag = hashTags[i];
        if (hashTag[0] !== '#') {
          errorText = 'Хэш-тег должен начинаться с решетки #';
        } else if (hashTag.length === 1) {
          errorText = 'Хеш-тег не может состоять только из одной решётки';
        } else if (hashTag.length > 20) {
          errorText = 'Максимальная длина одного хэш-тега 20 символов';
        } else if (hashTag.indexOf('#', 1) > 1) {
          errorText = 'Хэштеги должны разделяться пробелами';
        }
      }

      if (checkSameElement(hashTags)) {
        errorText = 'Один и тот же хэш-тег не может быть использован дважды';
      } else if (hashTags.length > 5) {
        errorText = 'Нельзя указать больше пяти хэш-тегов';
      }
    }
    hashTagsInput.setCustomValidity(errorText);
  };

  // функция которая проверяет наличие одинаковых элементов в массиве
  var checkSameElement = function (elements) {
    var sameElement = false;
    for (var i = 0; i <= elements.length - 2; i++) {
      var element = elements[i];
      for (var j = i + 1; j <= elements.length - 1; j++) {
        if (element === elements[j]) {
          sameElement = true;
        }
      }
    } return sameElement;
  };

  // при нажатии на кнопку "отправить" запускаем проверку на наличие хэштегов
  var buttonSendForm = document.querySelector('.img-upload__submit');
  buttonSendForm.addEventListener('click', function () {
    checkHashTagsValidity();
  });

})();
