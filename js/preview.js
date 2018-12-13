'use strict';

// preview.js модуль для отрисовки увеличенного изображения;

(function () {
  // комментарии для большого фото
  // ищем готовую разметку в html для рандомных комментариев
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  var renderComment = function (comments) {
    var commentsList = document.querySelector('.social__comments');
    commentsList.innerHTML = '';

    // создаем искуственный блок ФРАГМЕНТ
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      var element = commentTemplate.cloneNode(true);
      element.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      element.querySelector('.social__text').textContent = comments[i];
      fragment.appendChild(element);
    }
    // вставляем ФРАГМЕНТ в разметку
    document.querySelector('.social__comments').appendChild(fragment);
  };

  // функция которая открывает большую фотографию
  var openBigPhoto = function () {
    bigPicture.classList.remove('hidden');
    window.util.body.classList.add('modal-open');
    document.addEventListener('keydown', window.util.onEscPress);
  };

  // функция которая закрывает большую фотографию
  var closeBigPhoto = function () {
    bigPicture.classList.add('hidden');
    window.util.body.classList.remove('modal-open');
    document.removeEventListener('keydown', window.util.onEscPress);
  };

  // открываем большую фотографию
  var bigPicture = document.querySelector('.big-picture');
  var renderBigPicture = function (photo) {
    openBigPhoto();
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    renderComment(photo.comments);
  };

  // закрываем большую фотографию
  var buttonClose = bigPicture.querySelector('.big-picture__cancel');
  buttonClose.addEventListener('click', function () {
    closeBigPhoto();
  });

  // прячем блок счетчиков комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');

  // прячем загрузку новых комментариев
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');


  window.data = {
    renderBigPicture: renderBigPicture
  };
})();
