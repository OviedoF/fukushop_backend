const path = require('path');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
}) // Configurar lugar de almacenaje y nombre del archivo

const config = (propName) => multer({
    storage: storage,
    dest: path.join(__dirname, 'public', 'images'),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|webp|jfif|JPG|JPEG|PNG|GIF|WEBP|JFIF/; // Tipos de imágenes permitidas
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname)); // Testeo de tipos

        if (mimeType && extName){
            return cb(null, true); // Creación exitosa (error = null);
        } else {
            return cb('Error: El archivo debe ser una imágen válida'); // Fallo por tipo de imágen.
        }
    }
}).array(propName); // la consulta va a responder a la key "images" en la petición.

module.exports = config;