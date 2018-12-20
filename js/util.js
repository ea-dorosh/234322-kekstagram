'use strict';

// util.js — модуль с утилитными методами
(function () {
  window.util = {
    // генератор случайных чисел
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    // генератор слуайных элементов массива
    getRandomElement: function (elements) {
      return elements[window.util.getRandomNumber(0, elements.length - 1)];
    },
    KEYCODE_ESC: 27,
    onEscPress: function (evt, action) {
      if (evt.keyCode === window.util.KEYCODE_ESC) {
        action();
      }
    },
    body: document.querySelector('body'),
    main: document.querySelector('main'),

    // функция которая закрывает сообщение после загрузки по esc
    onMessageEscPress: function (evt) {
      window.util.onEscPress(evt, window.util.closeMessage);
    },
    // функция которая закрывает сообщение после загрузки
    closeMessage: function () {
      var modalElement = window.util.main.querySelector('.message');
      window.util.main.removeChild(modalElement);
      document.removeEventListener('keydown', window.util.onMessageEscPress);
      window.util.main.removeEventListener('click', window.util.closeMessage);
    },
    filterButtonsContainer: document.querySelector('.img-filters'),
    // функция для рандомного перемешивания массива
    shuffleArray: function (array) {
      var j;
      var temp;
      for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    }
  };
})();
