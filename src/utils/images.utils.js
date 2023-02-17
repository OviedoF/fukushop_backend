const path = require('path');
const fs = require('fs-extra');

const imagesUtils = {};

imagesUtils.deleteImage = (dirname) => {
    fs.unlink(dirname, (err) => {
        if (err) {
          console.error('No se ha podido eliminar la imágen del servidor.');
          return
        };
      
        console.log('Imágen eliminada del servidor.');
    })
};

imagesUtils.deleteReqImages = (req) => {
    if(req.files) {
      const keys = Object.keys(req.files);
      keys.forEach(key => {
        req.files[key].forEach(file => {
          const filename = file.filename;
          const dirname = path.join(__dirname, '..', 'public', 'images', filename);
          imagesUtils.deleteImage(dirname);
        })
      })
    }
  };

module.exports = imagesUtils