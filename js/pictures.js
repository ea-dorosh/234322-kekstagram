'use strict';

// общее кол-во фотографий
var PHOTO_QUANTITY = 25;

var MAX_LIKES = 200;
var MIN_LIKES = 15;
var ESC_KEYCODE = 27;

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
  for (var i = 0; i < quantity; i++) {
    comments[i] = generateOneComment();
  }
  return comments;
};

// создаем объект фотографии
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


// ищем готовую разметку в html для маленьких картинок
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
    element.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    element.querySelector('.social__text').textContent = comments[i];
    fragment.appendChild(element);
  }
  // вставляем ФРАГМЕНТ в разметку
  document.querySelector('.social__comments').appendChild(fragment);
};

// создаем большую фотографию
var renderBigPicture = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderComment(photo.comments);
};

// прячем блок счетчиков комментариев
document.querySelector('.social__comment-count').classList.add('visually-hidden');

// прячем загрузку новых комментариев
document.querySelector('.comments-loader').classList.add('visually-hidden');

// находим маленькое изображение на странице
var smallPhoto = document.querySelectorAll('.picture');

// создаем функцию которая слушает клики по маленьким фотографиям
// и делает их большими с помощью функции создания больших фотографий renderBigPicture
var addSmallPhotoHadler = function (miniPhoto, bigPhoto) {
  miniPhoto.addEventListener('click', function () {
    renderBigPicture(bigPhoto);
  });
};

// запускаем цикл в котором вызовется функция (которая слушает клики по маленьким фотографиям)
for (var i = 0; i < smallPhoto.length; i++) {
  addSmallPhotoHadler(smallPhoto[i], photos[i]);
}

// закрываем большую фотографию крестиком
var bigPicture = document.querySelector('.big-picture');
var buttonClose = document.querySelector('.big-picture__cancel');
buttonClose.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

// закрываем большую фотографию esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
    // закрываем форму редактирования изображения
    imageEdit.classList.add('hidden');
  }
});

// открываем форму редактирования изображения при действие change в форме загрузки новых фотографий
var uploadFile = document.querySelector('#upload-file');
var imageEdit = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  imageEdit.classList.remove('hidden');
  uploadFile.value = '';
});

// закрываем форму редактирования изображения крестиком
var imageEditCloseBtn = document.querySelector('.img-upload__cancel');
imageEditCloseBtn.addEventListener('click', function () {
  imageEdit.classList.add('hidden');
});
