'use strict';

// общее кол-во фотографий
var PHOTO_QUANTITY = 25;

var MAX_LIKES = 200;
var MIN_LIKES = 15;

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

// генератор случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// генератор случайных элементов массива
var getRandomElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

// получаем лайки
var getLikes = function () {
  return getRandomNumber(MIN_LIKES, MAX_LIKES);
};


// получаем один комментарий
var generateOneComment = function () {
  var comments = [];
  var quantity = getRandomNumber(1, 2);
  for (var i = 0; i < quantity; i++) {
    comments.push(getRandomElement(COMMENTS));
  }
  return comments.join(' ');
};

// создаем массив с комментариями к фотографии
var getComments = function () {
  var comments = [];
  var quantity = getRandomNumber(1, 10);
  for (var i = 0; i < quantity.length; i++) {
    comments[i] = generateOneComment();
  }
  return comments;
};

// создаем фотографии
var generatePhoto = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getLikes(),
      comments: getComments(),
      description: getRandomElement(DESCRIPTIONS)
    };
  } return photos;
};

// создаем массив с объектами фотографий
var photos = generatePhoto(PHOTO_QUANTITY);

// ищем готовую разметку в html
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var appendPictures = function () {

  // создаем искуственный блок ФРАГМЕНТ
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var element = pictureTemplate.cloneNode(true);
    element.querySelector('.picture__img').src = photos[i].url;
    element.querySelector('.picture__likes').textContent = photos[i].likes;
    element.querySelector('.picture__comments').textContent = photos[i].comments.length;
    fragment.appendChild(element);
  }

  // вставляем ФРАГМЕНТ в разметку
  document.querySelector('.pictures').appendChild(fragment);
};

appendPictures();

// задание №4

// создаем большую фотографию

var renderBigPicture = function (photo) {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
};

renderBigPicture(photos[getRandomNumber(0, PHOTO_QUANTITY)]);


var socialComments = document.querySelector('.social__comments');


socialComments.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
socialComments.querySelector('.social__text').textContent = photos[0].comments;
document.querySelector('.social__caption').textContent = photos[0].description;

// задание №5


document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
