const path = require('path');
const cloudinary = require(path.join(__dirname, '..', 'config', 'cloudinary.config'));

function uploadToCloudinary(req, res, next) {
  const files = req.files;
  console.log(files)

  // Si no hay archivos, continuar con la siguiente función
  if (!files) {
    return next();
  }

  // Subir todas las imágenes a Cloudinary
  const uploadPromises = [];

  Object.keys(files).forEach(fieldName => {
    const fieldFiles = files[fieldName];

    fieldFiles.forEach(file => {
      uploadPromises.push(new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) {
            return reject(error);
          }

          // Reemplazar el nombre del archivo por la URL de Cloudinary
          file.cloudinary_url = result.secure_url;
          resolve();
        }).end(file.buffer);
      }));
    });
  });

  // Esperar a que todas las promesas se resuelvan y continuar con la siguiente función
  Promise.all(uploadPromises)
    .then(() => {
      next();
    })
    .catch(error => {
      console.log('[MIDDLEWARE] Error uploading to Cloudinary');
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

module.exports = uploadToCloudinary;