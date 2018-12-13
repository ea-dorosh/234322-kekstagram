'use strict';

// form.js модуль, который работает с формой редактирования изображения.

(function () {
  // функция которая открывает форму загрузки новой фотографии
  var openForm = function () {
    imageEdit.classList.remove('hidden');
    window.util.body.classList.add('modal-open');
    document.addEventListener('keydown', window.util.onEscPress);
  };

  // функция которая закрывает форму загрузки новой фотографии
  var closeForm = function () {
    uploadFile.value = '';
    imageEdit.classList.add('hidden');
    window.util.body.classList.remove('modal-open');
    document.removeEventListener('keydown', window.util.onEscPress);
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
  var imgPreviewElement = document.querySelector('.img-upload__preview img');

  var setPhotoScale = function (figure) {
    var currentScale = parseInt(scaleControlValue.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * figure);
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleControlValue.value = currentScale + '%';
      imgPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
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
  var DEFAULT_EFFECT = 'none';

  var EffectParameter = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    }
  };

  var EffectValue = {
    MAX: 100,
    DEFAULT: 100,
  };

  var PinValue = {
    MIN: 0,
    MAX: 100
  };

  // находим фильтры для наложениея эффекта на изображение
  // var filterRadioBtn = document.querySelector('.img-upload__effects');

  // находим изображение на которое будем применять фильтр
  var uploadElement = document.querySelector('.img-upload');

  // находим слайдер для изменения глубины эффекта, накладываемого на изображение
  var effectLevelElement = document.querySelector('.img-upload__effect-level');

  // находим список фильтров для наложения эффекта на изображение
  var effectsListElement = uploadElement.querySelector('.effects__list');

  // находим фильтр который сейчас применен на изображении
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked').value;

  // создаем переменную которая содержит текущий class на изображении
  // var currentEffectClass = 'effects__preview--' + currentEffectName;

  // создаем функцию которая меняет фильтр на изображении
  var onImageEffectClick = function (evt) {
    // проверяем произошел ли клик на инпуте
    var target = evt.target;
    if (target.tagName !== 'INPUT') {
      // если нет, выходим из функции
      return;
    } else {
      // удаляем старый класс на изображении
      imgPreviewElement.classList = '';

      // меняем класс на новый
      currentEffectName = target.value;
      // currentEffectClass = 'effects__preview--' + currentEffectName;

      // проверяем если текущий класс "без эффекта", тогда удаляем слайдер для изменения глубины эффекта
      if (currentEffectName === DEFAULT_EFFECT) {
        effectLevelElement.classList.add('hidden');
      } else {
        effectLevelElement.classList.remove('hidden');
        setPinPosition(PinValue.MAX);
      }
    }
  };

  // запускаем обработчик для смены фильтра
  effectsListElement.addEventListener('click', onImageEffectClick);

  var applyEffect = function (value) {
    if (getFilterValue === 'none') {
      imgPreviewElement.style.filter = '';
    } else {
      imgPreviewElement.style.filter = EffectParameter[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')';
    }
  };

  var getFilterValue = function (effect, value) {
    return value * (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / EffectValue.MAX + EffectParameter[effect].MIN_VALUE + EffectParameter[effect].UNIT;
  };

  //
  // валидность хэштегов
  //

  // пунк ТЗ если фокус находится в поле ввода хэш-тега,
  // нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

  var hashTagsInput = document.querySelector('.text__hashtags');
  hashTagsInput.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.util.onEscPress);
  });

  hashTagsInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.util.onEscPress);
  });

  // пунк ТЗ если фокус находится в поле ввода комментария,
  // нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
  var descriptionTextarea = document.querySelector('.text__description');
  descriptionTextarea.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.util.onEscPress);
  });

  descriptionTextarea.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.util.onEscPress);
  });

  // функция которая проверяет хэштеги из массива на валидность
  var checkHashTagsValidity = function () {
    var errorText = '';
    var hashTagValue = hashTagsInput.value.trim();
    if (hashTagValue !== '') {
      var hashTags = hashTagValue.toLowerCase().split(' ');


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
    checkHashTagsValidity();
  });

  //
  // перетаскиваем ползунок слайдера DragAndDrop
  //
  var effectPinElement = imageEdit.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
  var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
  var effectLineElement = effectLevelElement.querySelector('.effect-level__line');

  var setPinPosition = function (value) {
    effectPinElement.style.left = value + '%';
    effectLevelValueElement.value = Math.round(value);
    effectDepthElement.style.width = effectPinElement.style.left;
    applyEffect(value);
  };

  effectPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var sliderLine = effectLineElement.getBoundingClientRect();
      var newPosition = (effectPinElement.offsetLeft - shift) / sliderLine.width * 100;

      if (newPosition <= PinValue.MIN) {
        newPosition = PinValue.MIN;
      } else if (newPosition >= PinValue.MAX) {
        newPosition = PinValue.MAX;
      }
      setPinPosition(newPosition);

      startCoords = moveEvt.clientX;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
