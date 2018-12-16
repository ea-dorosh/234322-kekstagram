'use strict';

// backend.js модуль для работы с сетью;
(function () {
  var loadLink = 'https://js.dump.academy/kekstagram/data';
  var uploadLink = 'https://js.dump.academy/kekstagram';
  var timeout = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + timeout + ' мс');
    });

    xhr.open('GET', loadLink);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + timeout + ' мс');
    });

    xhr.open('POST', uploadLink);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
