'use strict';

// sacle.js модуль, который работает с формой редактирования изображения, а точнее с ее масштабом

(function () {
  // уменьшение и увеличение загружаемой фотографии
  var ScaleValue = {
    MIN: 25,
    STEP: 25,
    MAX: 100,
    DEFAULT: 100
  };
  var scaleControlValue = window.form.imageEdit.querySelector('.scale__control--value');


  var setPhotoScale = function (figure) {
    var currentScale = parseInt(scaleControlValue.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * figure);
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleControlValue.value = currentScale + '%';
      window.effects.imgPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  var scaleControlSmaller = window.form.imageEdit.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.form.imageEdit.querySelector('.scale__control--bigger');

  scaleControlSmaller.addEventListener('click', function () {
    setPhotoScale(-1);
  });

  scaleControlBigger.addEventListener('click', function () {
    setPhotoScale(1);
  });
})();
