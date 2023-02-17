const path = require('path');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const {ProductColor} = require(path.join(__dirname, '..', 'models', 'product.model'));

const configData = async (req, res, next) => {
    const productColors = await ProductColor.find();
    const fieldsAvailable = productColors.map(el => {
        return {name: el.imageKey, maxCount: 20}
    });
    fieldsAvailable.push({name: 'images', maxCount: 20})

    console.log('Campos disponibles para imágenes: ', fieldsAvailable.map(el => el.name))

    console.log('Se ha creado la configuración de multer para imágenes.')

    req.fieldsAvailable = fieldsAvailable;

    next();
}

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'images'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
}) // Configurar lugar de almacenaje y nombre del archivo

const upload = multer({
    storage: storage,
    dest: path.join(__dirname, 'public', 'images'),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|webp|jfif|avif|JPEG|JPG|PNG|GIF|WEBP|JFIF|AVIF/; // Tipos de imágenes permitidas
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname)); // Testeo de tipos

        if (mimeType && extName){
            return cb(null, true); // Creación exitosa (error = null);
        } else {
            return cb('Error: El archivo debe ser una imágen válida'); // Fallo por tipo de imágen.
        }
    }
});

module.exports = {
    upload,
    configData
};