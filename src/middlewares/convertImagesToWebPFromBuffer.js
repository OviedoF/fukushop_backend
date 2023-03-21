const path = require('path');
const { deleteImage } = require(path.join(__dirname, '..', 'libs', 'dirLibrary'));
const sharp = require('sharp');

async function convertImagesToWebPFromBuffer(req, res, next) {
    if (!req.files) return next();

    const fileProperties = Object.keys(req.files);

    // Iterar sobre cada propiedad de archivos en el objeto req.files
    for (const property of fileProperties) {
      let files = req.files[property];
      if (!Array.isArray(files)) {
        // Convertir a un array si solo hay un archivo
        files = [files];
      }
  
      // Iterar sobre cada archivo de imagen y convertirlo a WebP
      for (const file of files) {
        if (file.mimetype.startsWith('image/') && file.mimetype !== 'image/webp') {
          try {
            const convertedBuffer = await sharp(file.buffer).toFormat('webp').toBuffer();
  
            // Actualizar el objeto del archivo con los datos de la imagen convertida
            file.buffer = convertedBuffer;
            file.size = convertedBuffer.length;
            file.mimetype = 'image/webp';
            file.originalname = file.originalname.replace(/\.\w+$/, '.webp');
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  
    next();
}

module.exports = convertImagesToWebPFromBuffer;