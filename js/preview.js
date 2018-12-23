'use strict';

// preview.js модуль для отрисовки увеличенного изображения;

(function () {

  var DISPLAY_COMMENTS = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  var commentElement = document.querySelector('.social__footer-text');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
  var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
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
      if (comments.length <= DISPLAY_COMMENTS) {
        commentsLoaderElement.classList.add('hidden');
      }
      element.querySelector('.social__picture').src = comments[i].avatar;
      element.querySelector('.social__text').textContent = comments[i].message;
      fragment.appendChild(element);
    }
    document.querySelector('.social__comments').appendChild(fragment);
    updateCommentsCount(comments.length);
  };

  var updateCommentsCount = function (count) {
    var displayedComments = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCount = displayedComments + ' из ' + '<span class="comments-count">' + count + '</span>' + ' комментариев';
    commentCountElement.innerHTML = commentsCount;
  };

  var loadComment = function () {
    var commentsAmount = bigPictureElement.querySelectorAll('.social__comment');
    var hiddenCommentElements = commentsListElement.querySelectorAll('.visually-hidden');
    for (var i = 0; i < DISPLAY_COMMENTS; i++) {
      if (!hiddenCommentElements[i]) {
        commentsLoaderElement.classList.add('hidden');
        updateCommentsCount(commentsAmount.length);
        return;
      }
      hiddenCommentElements[i].classList.remove('visually-hidden');
      updateCommentsCount(commentsAmount.length);
    }
  };

  commentsLoaderElement.addEventListener('click', function () {
    loadComment();
  });

  var openBigPhoto = function () {
    bigPictureElement.classList.remove('hidden');
    window.util.bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onEscPress);
  };

  commentElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  commentElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  var closeBigPhoto = function () {
    bigPictureElement.classList.add('hidden');
    window.util.bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
    commentsLoaderElement.classList.remove('hidden');
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

  window.preview = {
    renderBigPicture: renderBigPicture
  };
})();
