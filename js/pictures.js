'use strict';

// общее кол-во фотографий
var photoQuantity = 25;

// массив описаний
var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// массив комментариев
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// генератор случайных чисел
var makeRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// получаем лайки
var makeLikes = function () {
  return makeRandomNumber(15, 201);
};

// получаем описание
var makeDescription = function (descriptions) {
  return makeRandomNumber(0, descriptions.length--);
};

// получаем комментарии
var makeComments = function (commentaries) {

  // выбираем сколько будет комментариев 1 или 2
  var quantity = makeRandomNumber(1, 3);

  // создаем массив с комментариями под фото
  var photoComments = [];

  for (var i = 1; i <= quantity; i++) {
    photoComments.push(commentaries[makeRandomNumber(0, commentaries.length--)]);
  }

  return photoComments;
};

// создаем одну фотогорафию
var makePhoto = function () {
  var photo = {
    // url:,
    likes: makeLikes(),
    comments: makeComments(comments),
    description: makeDescription(description)
  };
  return photo;
};

var makePhotoArray = function (numberOfPhoto) {
  var photoArray = [];
  for (var i = 1; i <= numberOfPhoto; i++) {
    var photoItem = makePhoto(i);
    photoArray.push(photoItem);
  }

  return photoArray;
};

makePhotoArray(photoQuantity);
