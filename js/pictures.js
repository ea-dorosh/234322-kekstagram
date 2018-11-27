'use strict';

// общее кол-во фотографий
var PHOTO_QUANTITY = 25;

// массив описаний
/* var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];*/

/* // массив комментариев
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];*/

// генератор случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// генератор случайных элементов массива
/* var getRandomElement = function (elements) {
  return getRandomNumber(0, elements.length--);
};*/

// получаем лайки
var getLikes = function () {
  return getRandomNumber(15, 200);
};

/* // по "комментариям" нужен разбор, пока пропущу задание про комментаррии и продолжу без них
// получаем комментарии
var generateComments = function () {

  // выбираем сколько будет комментариев 1 или 2
  var quantity = getRandomNumber(1, 2);

  // создаем массив с комментариями под фото
  var photoComments = [];

  for (var i = 1; i <= quantity; i++) {
    photoComments.push(commentaries[getRandomNumber(0, commentaries.length--)]);
  }

  return photoComments;
};
*/

// создаем фотографии
var generatePhoto = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getLikes(),
      // comments: ...,
      // description: DESCRIPTIONS[getRandomElement(DESCRIPTIONS)]
    };
  } return photos;
};

// создаем массив с объектами фотографий
var photoGallery = generatePhoto(PHOTO_QUANTITY);

// ищем готовую разметку в html
var template = document.querySelector('#picture').content.querySelector('a');

// создаем искуственный блок ФРАГМЕНТ
var fragment = document.createDocumentFragment();

//
for (var i = 0; i < photoGallery.length; i++) {
  var element = template.cloneNode(true);
  element.querySelector('.picture__img').src = photoGallery[i].url;
  element.querySelector('.picture__likes').textContent = photoGallery[i].likes;
  // element.querySelector('.picture__comments').textContent = photoGallery[i].comments.length;
  fragment.appendChild(element);
}

// вставляем ФРАГМЕНТ в разметку
document.querySelector('.pictures').appendChild(fragment);

// задание №4

// создаем большую фотографию
var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoGallery[0].url;
bigPicture.querySelector('.likes-count').textContent = photoGallery[0].likes;
// bigPicture.querySelector('.comments-count').textContent = photoGallery[0].comments.length;

// var socialComments = document.querySelector('.social__comments');
// socialComments.querySelector('.social__picture').src='img/avatar-' + Math.ceil(Math.random() * 6 ) + '.svg';
// socialComments.querySelector('.social__text').textContent = photoGallery[0].comments;
// bigPicture.querySelector('.social__caption').textContent = photoGallery[0].description;

// задание №5

/*
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
*/
