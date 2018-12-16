'use strict';

// data.js — модуль, который создаёт данные;

/*
(function () {
  // общее кол-во фотографий
  var PHOTO_QUANTITY = 25;

  // кол-во лайков на фотографии
  var Like = {
    MIN: 15,
    MAX: 200
  };

  // массив описаний
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  // массив комментариев
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // получаем лайки
  var getLikes = function () {
    return window.util.getRandomNumber(Like.MIN, Like.MAX);
  };

  // получаем один комментарий, который состоит из одного или двух фраз массива COMMENTS
  var generateOneComment = function () {
    var comments = [];
    var quantity = window.util.getRandomNumber(1, 2);
    for (var i = 0; i < quantity; i++) {
      comments.push(window.util.getRandomElement(COMMENTS));
    }
    return comments.join(' ');
  };

  // создаем массив с комментариями, состоящий от 1 до 10 комментариев
  var getComments = function () {
    var comments = [];
    var quantity = window.util.getRandomNumber(1, 10);
    for (var i = 0; i < quantity; i++) {
      comments[i] = generateOneComment();
    }
    return comments;
  };

  // создаем массив с объектами фотографий в любом кол-ве
  var generatePhoto = function (count) {
    var photos = [];
    for (var i = 0; i < count; i++) {
      photos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getLikes(),
        comments: getComments(),
        description: window.util.getRandomElement(DESCRIPTIONS)
      };
    } return photos;
  };

  // запускаем создание массива с нужным кол-вом фотографий
  var photos = generatePhoto(PHOTO_QUANTITY);

  /*
  var appendPictures = function () {
    // создаем искуственный блок ФРАГМЕНТ
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    // вставляем ФРАГМЕНТ в разметку
    document.querySelector('.pictures').appendChild(fragment);
  };

  appendPictures();
*/

(function () {
  // ищем готовую разметку в html-странице для маленьких картинок
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // функция которая вставляет в разметку маленькие фотографии
  var renderPicture = function (photo) {
    var element = pictureTemplate.cloneNode(true);
    // находим адрес изображения
    element.querySelector('.picture__img').src = photo.url;
    // находим кол-во лайков на изображении
    element.querySelector('.picture__likes').textContent = photo.likes;
    // находим кол-во комментариев на изображении
    element.querySelector('.picture__comments').textContent = photo.comments.length;

    // обработчик для создания большой фотографии
    element.addEventListener('click', function () {
      window.preview.renderBigPicture(photo);
    });
    return element;
  };

  window.backend.load(function (pictures) {
    // создаем искуственный блок ФРАГМЕНТ
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    // вставляем ФРАГМЕНТ в разметку
    document.querySelector('.pictures').appendChild(fragment);
  });
})();
