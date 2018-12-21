'use strict';

// util.js — модуль с утилитными методами
(function () {

  window.util = {
    KEYCODE_ESC: 27,
    filterButtonsContainer: document.querySelector('.img-filters'),
    bodyElement: document.querySelector('body'),
    mainElement: document.querySelector('main'),
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomElement: function (elements) {
      return elements[window.util.getRandomNumber(0, elements.length - 1)];
    },
    onEscPress: function (evt, action) {
      if (evt.keyCode === window.util.KEYCODE_ESC) {
        action();
      }
    },
    onMessageEscPress: function (evt) {
      window.util.onEscPress(evt, window.util.closeMessage);
    },
    closeMessage: function () {
      var modalElement = window.util.mainElement.querySelector('.message');
      window.util.mainElement.removeChild(modalElement);
      document.removeEventListener('keydown', window.util.onMessageEscPress);
      window.util.mainElement.removeEventListener('click', window.util.closeMessage);
    },
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
