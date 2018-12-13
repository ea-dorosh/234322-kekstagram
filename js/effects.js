'use strict';

// effects.js модуль, который работает с формой редактирования изображения, а точнее с ее эффектами

(function () {
  // изменение фильтра на фотографии
  var imgPreviewElement = document.querySelector('.img-upload__preview img');

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
  // перетаскиваем ползунок слайдера DragAndDrop
  //
  var effectPinElement = window.form.imageEdit.querySelector('.effect-level__pin');
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

  window.effects = {
    imgPreviewElement: imgPreviewElement,
  };

})();
