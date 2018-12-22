'use strict';

// form.js модуль, который работает с формой редактирования изображения.

(function () {

  var Hashtag = {
    MAX_QUANTITY: 5,
    MIN_LENGTH: 1,
    MAX_LEGTH: 20,
    HASH_SYMBOL: '#'
  };

  var uploadFileElement = document.querySelector('#upload-file');
  var imageEditElement = document.querySelector('.img-upload__overlay');
  var hashtagElement = document.querySelector('.text__hashtags');
  var formElement = document.querySelector('.img-upload__form');
  var imageEditCloseBtn = imageEditElement.querySelector('.img-upload__cancel');
  var descriptionElement = document.querySelector('.text__description');
  var imgSubmitButtonElement = document.querySelector('.img-upload__submit');

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeForm);
  };

  var openForm = function () {
    imageEditElement.classList.remove('hidden');
    window.util.bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onEscPress);
  };

  var closeForm = function () {
    uploadFileElement.value = '';
    window.effects.setDefault();
    window.scale.scaleDefault();
    descriptionElement.value = '';
    hashtagElement.value = '';
    imageEditElement.classList.add('hidden');
    window.util.bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };

  uploadFileElement.addEventListener('change', function () {
    openForm();
  });

  imageEditCloseBtn.addEventListener('click', function () {
    closeForm();
  });

  var onSuccess = function () {
    closeForm();
    window.success.showMessage();
  };

  var onError = function (message) {
    closeForm();
    window.error.showMessage(message);
  };

  formElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(formElement), onSuccess, onError);
    evt.preventDefault();
  });


  hashtagElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  hashtagElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  descriptionElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  descriptionElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  var checkHashTagsValidity = function () {
    var errorText = '';
    var hashTagValue = hashtagElement.value.trim();
    if (hashTagValue !== '') {
      var hashTags = hashTagValue.toLowerCase().split(' ');
      for (var i = 0; i < hashTags.length; i++) {
        var hashTag = hashTags[i];
        if (hashTag[0] !== '#') {
          errorText = 'Хэш-тег должен начинаться с решетки #';
        } else if (hashTag.length === Hashtag.MIN_LENGTH) {
          errorText = 'Хеш-тег не может состоять только из одной решётки';
        } else if (hashTag.length > Hashtag.MAX_LEGTH) {
          errorText = 'Максимальная длина одного хэш-тега 20 символов';
        } else if (hashTag.indexOf(Hashtag.HASH_SYMBOL, 1) > 1) {
          errorText = 'Хэштеги должны разделяться пробелами';
        }
      }
      if (checkSameElement(hashTags)) {
        errorText = 'Один и тот же хэш-тег не может быть использован дважды';
      } else if (hashTags.length > Hashtag.MAX_QUANTITY) {
        errorText = 'Нельзя указать больше пяти хэш-тегов';
      }
    }
    hashtagElement.setCustomValidity(errorText);
  };

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

  var highlightInvalidField = function (field) {
    field.style.outline = !field.validity.valid ? '2px solid red' : 'none';
  };

  imgSubmitButtonElement.addEventListener('click', function () {
    checkHashTagsValidity();
    highlightInvalidField(hashtagElement);
  });

})();
