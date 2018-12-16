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
    body: document.querySelector('body')
  };
})();
