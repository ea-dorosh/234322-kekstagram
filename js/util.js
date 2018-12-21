'use strict';

// util.js — модуль с утилитными методами
(function () {

  var KEYCODE_ESC = 27;

  window.util = {
    bodyElement: document.querySelector('body'),
    mainElement: document.querySelector('main'),
    onEscPress: function (evt, action) {
      if (evt.keyCode === KEYCODE_ESC) {
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
