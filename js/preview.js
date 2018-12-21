'use strict';

// preview.js модуль для отрисовки увеличенного изображения;

(function () {

  var DISPLAY_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentsListElement = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var formCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

  var onEscPress = function (evt) {
    window.util.onEscPress(evt, closeBigPhoto);
  };

  var renderComment = function (comments) {
    commentsListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      if (i >= DISPLAY_COMMENTS) {
        element.classList.add('visually-hidden');
      }
      element.querySelector('.social__picture').src = comments[i].avatar;
      element.querySelector('.social__text').textContent = comments[i].message;
      fragment.appendChild(element);
    }
    document.querySelector('.social__comments').appendChild(fragment);
  };

  var openBigPhoto = function () {
    bigPictureElement.classList.remove('hidden');
    window.util.bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onEscPress);
  };

  var closeBigPhoto = function () {
    bigPictureElement.classList.add('hidden');
    window.util.bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };

  var renderBigPicture = function (photo) {
    openBigPhoto();
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    renderComment(photo.comments);
  };

  formCloseElement.addEventListener('click', function () {
    closeBigPhoto();
  });

  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

  window.preview = {
    renderBigPicture: renderBigPicture
  };
})();
