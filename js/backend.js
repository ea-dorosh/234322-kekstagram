'use strict';

// backend.js модуль для работы с сетью;
(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram/'
  };
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT; // ТАЙМАУТ!
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  /*
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка соединения');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
    });

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
    });

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };
*/
  window.backend = {
    load: load,
    upload: upload
  };
})();
