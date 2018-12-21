'use strict';

// sacle.js модуль, который работает с формой редактирования изображения, а точнее с ее масштабом

(function () {

  var ScaleValue = {
    MIN: 25,
    STEP: 25,
    MAX: 100,
    DEFAULT: 100
  };

  var scaleControlElement = document.querySelector('.img-upload__scale');
  var scaleControlValue = scaleControlElement.querySelector('.scale__control--value');
  var scaleControlSmaller = scaleControlElement.querySelector('.scale__control--smaller');
  var scaleControlBigger = scaleControlElement.querySelector('.scale__control--bigger');

  var setPhotoScale = function (figure) {
    var currentScale = parseInt(scaleControlValue.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * figure);
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleControlValue.value = currentScale + '%';
      window.effects.imgPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  scaleControlSmaller.addEventListener('click', function () {
    setPhotoScale(-1);
  });

  scaleControlBigger.addEventListener('click', function () {
    setPhotoScale(1);
  });

  var scaleDefault = function () {
    window.effects.imgPreviewElement.style.transform = 'scale(' + ScaleValue.DEFAULT / 100 + ')';
  };

  window.scale = {
    scaleDefault: scaleDefault
  };

})();
