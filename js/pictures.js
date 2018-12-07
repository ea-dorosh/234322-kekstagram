'use strict';

// общее кол-во фотографий
var PHOTO_QUANTITY = 25;

var Like = {
  MIN: 15,
  MAX: 200
};

var ESC_KEYCODE = 27;

var body = document.querySelector('body');

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
  return getRandomNumber(Like.MIN, Like.MAX);
};

// получаем один комментарий, который состоит из одного или двух фраз массива COMMENTS
var generateOneComment = function () {
  var comments = [];
  var quantity = getRandomNumber(1, 2);
  for (var i = 0; i < quantity; i++) {
    comments.push(getRandomElement(COMMENTS));
  }
  return comments.join(' ');
};

// создаем массив с комментариями, состоящий от 1 до 10 комментариев
var getComments = function () {
  var comments = [];
  var quantity = getRandomNumber(1, 10);
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
      description: getRandomElement(DESCRIPTIONS)
    };
  } return photos;
};

// запускаем создание массива с нужным кол-вом фотографий
var photos = generatePhoto(PHOTO_QUANTITY);

// ищем готовую разметку в html-странице для маленьких картинок
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//
var renderPicture = function (photo) {
  var element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photo.url;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;

  // обработчик для создания большой фотографии
  element.addEventListener('click', function () {
    renderBigPicture(photo);
  });
  return element;
};

//
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

// комментарии для большого фото
//
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

// функция которая открывает большую фотографию
var openBigPhoto = function () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
};

// функция которая закрывает большую фотографию
var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
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


// функция которая закрывает открыте окна с помощью "esc"
var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
    closeBigPhoto();
  }
};

// функция которая открывает форму загрузки новой фотографии
var openForm = function () {
  imageEdit.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscPress);
};

// функция которая закрывает форму загрузки новой фотографии
var closeForm = function () {
  uploadFile.value = '';
  imageEdit.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
};

// открываем форму редактирования изображения при действие change в форме загрузки новых фотографий
var uploadFile = document.querySelector('#upload-file');
var imageEdit = document.querySelector('.img-upload__overlay');
uploadFile.addEventListener('change', function () {
  openForm();
});

// закрываем форму редактирования изображения мышкой
var imageEditCloseBtn = imageEdit.querySelector('.img-upload__cancel');
imageEditCloseBtn.addEventListener('click', function () {
  closeForm();
});

//
// уменьшение и увеличение загружаемой фотографии
//
var ScaleValue = {
  MIN: 25,
  STEP: 25,
  MAX: 100,
  DEFAULT: 100
};
var scaleControlValue = imageEdit.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');

var setPhotoScale = function (figure) {
  var currentScale = parseInt(scaleControlValue.value, 10);
  currentScale = currentScale + (ScaleValue.STEP * figure);
  if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
    scaleControlValue.value = currentScale + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScale / 100 + ')';
  }
};

var scaleControlSmaller = imageEdit.querySelector('.scale__control--smaller');
var scaleControlBigger = imageEdit.querySelector('.scale__control--bigger');

scaleControlSmaller.addEventListener('click', function () {
  setPhotoScale(-1);
});

scaleControlBigger.addEventListener('click', function () {
  setPhotoScale(1);
});

//
// изменение фильтра на фотографии
//
var filterSlider = document.querySelector('.img-upload__effect-level');
var filterRadioBtn = document.querySelector('.img-upload__effects');
filterRadioBtn.addEventListener('change', function () {
  var filterChecked = filterRadioBtn.querySelector('input:checked');
  imgUploadPreview.className = 'effects__preview--' + filterChecked.value;
  if (imgUploadPreview.classList.contains('effects__preview--none')) {
    filterSlider.classList.add('hidden');
  } else {
    filterSlider.classList.remove('hidden');
  }
});

//
// валидность хэштегов
//

/*
готово! хэш-теги необязательны;
готово! хэш-тег начинается с символа # (решётка);
готово! хеш-тег не может состоять только из одной решётки;
  хэш-теги разделяются пробелами;
готово! один и тот же хэш-тег не может быть использован дважды;
готово! нельзя указать больше пяти хэш-тегов;
готово! максимальная длина одного хэш-тега 20 символов, включая решётку;
готово! теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.
готово! если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
*/

// пунк ТЗ если фокус находится в поле ввода хэш-тега,
// нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

var hashTagsInput = document.querySelector('.text__hashtags');
hashTagsInput.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onEscPress);
});

hashTagsInput.addEventListener('focusout', function () {
  document.addEventListener('keydown', onEscPress);
});

// пунк ТЗ если фокус находится в поле ввода комментария,
// нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
var descriptionTextarea = document.querySelector('.text__description');
descriptionTextarea.addEventListener('focusin', function () {
  document.removeEventListener('keydown', onEscPress);
});

descriptionTextarea.addEventListener('focusout', function () {
  document.addEventListener('keydown', onEscPress);
});

// получаем хэштеги и записываем их в массив
var hashTagsArr = [];
var getHashTags = function () {
  hashTagsArr = hashTagsInput.value.toLowerCase().split(' ');
  return hashTagsArr;
};

// функция которая проверяет хэштеги из массива на валидность
var checkHashTagsValidity = function (hashTags) {
  var errorText = '';

  for (var i = 0; i < hashTags.length; i++) {
    var hashTag = hashTags[i];
    if (hashTag[0] !== '#') {
      errorText = 'Хэш-тег должен начинаться с решетки #';
    } else if (hashTag.length === 1) {
      errorText = 'Хеш-тег не может состоять только из одной решётки';
    } else if (hashTag.length > 20) {
      errorText = 'Максимальная длина одного хэш-тега 20 символов';
    } else if (hashTag.indexOf('#', 1) > 1) {
      errorText = 'Хэштеги должны разделяться пробелами';
    }
  }

  if (checkSameElement(hashTags)) {
    errorText = 'Один и тот же хэш-тег не может быть использован дважды';
  } else if (hashTags.length > 5) {
    errorText = 'Нельзя указать больше пяти хэш-тегов';
  }

  hashTagsInput.setCustomValidity(errorText);
};

// функция которая проверяет наличие одинаковых элементов в массиве
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

// при нажатии на кнопку "отправить" запускаем проверку на наличие хэштегов
var buttonSendForm = document.querySelector('.img-upload__submit');
buttonSendForm.addEventListener('click', function () {
  getHashTags();
  if (hashTagsArr.length !== 0) {
    checkHashTagsValidity(hashTagsArr);
  }
});
