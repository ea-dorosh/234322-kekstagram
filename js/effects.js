'use strict';

// effects.js модуль, который работает с формой редактирования изображения, а точнее с ее эффектами

(function () {

  var imgPreviewElement = document.querySelector('.img-upload__preview img');
  var uploadElement = document.querySelector('.img-upload');
  var effectLevelElement = document.querySelector('.img-upload__effect-level');
  var effectsListElement = uploadElement.querySelector('.effects__list');
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked').value;
  var effectPinElement = window.form.imageEdit.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
  var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
  var effectLineElement = effectLevelElement.querySelector('.effect-level__line');

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

  var onImageEffectClick = function (evt) {
    var target = evt.target;
    if (target.tagName !== 'INPUT') {
      return;
    } else {
      imgPreviewElement.classList = '';
      currentEffectName = target.value;
      if (currentEffectName === DEFAULT_EFFECT) {
        effectLevelElement.classList.add('hidden');
      } else {
        effectLevelElement.classList.remove('hidden');
        setPinPosition(PinValue.MAX);
      }
    }
  };

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
