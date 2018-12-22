'use strict';

// main.js — модуль, который создаёт данные;

(function () {

  var photos = [];
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoList = document.querySelector('.pictures');

  var filterElement = document.querySelector('.img-filters');

  var filterFormElement = filterElement.querySelector('.img-filters__form');
  var filterElements = filterElement.querySelectorAll('.img-filters__button');
  var filterPopularElement = filterElement.querySelector('#filter-popular');
  var filterNewElement = filterElement.querySelector('#filter-new');
  var filterDiscussedElement = filterElement.querySelector('#filter-discussed');

  var renderPicture = function (photo) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = photo.url;
    element.querySelector('.picture__likes').textContent = photo.likes;
    element.querySelector('.picture__comments').textContent = photo.comments.length;
    element.addEventListener('click', function () {
      window.preview.renderBigPicture(photo);
    });
    return element;
  };

  var appendPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  var onLoad = function (data) {
    photos = data;
    appendPictures(photos);
    filterElement.classList.remove('img-filters--inactive');
    return photos;
  };

  window.backend.load(onLoad, window.error.onError);

  var clearPosts = function () {
    document.querySelectorAll('.picture').forEach(function (photo) {
      photoList.removeChild(photo);
    });
  };

  var getNewPosts = function (posts) {
    var newPosts = posts.slice();
    return window.util.shuffleArray(newPosts).slice(0, 10);
  };

  var sortByComments = function (posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var toggleFilterClass = function (target) {
    filterElements.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');
  };

  var applyFilter = function (target) {
    clearPosts();
    toggleFilterClass(target);
    switch (target) {
      case filterPopularElement:
        appendPictures(photos);
        break;
      case filterNewElement:
        appendPictures(getNewPosts(photos));
        break;
      case filterDiscussedElement:
        appendPictures(sortByComments(photos));
        break;
    }
  };

  var debounceFilters = window.debounce(applyFilter);
  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON') {
      debounceFilters(target);
    }
  });

})();
