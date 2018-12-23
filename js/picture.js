'use strict';

// picture.js модуль, который добавляет выбранную картинку с компьютера на сайт


(function () {

  var uploadPictrue = function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var uploadFileElement = document.querySelector('#upload-file');
    var imgPreviewElement = document.querySelector('.img-upload__preview img');
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.picture = {
    uploadPictrue: uploadPictrue
  };

})();
