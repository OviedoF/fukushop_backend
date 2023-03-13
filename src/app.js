const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs-extra');
require('dotenv').config();
const {upload, configData} = require(path.join(__dirname, 'config', 'multer.config'))
const createInitialRoles = require(path.join(__dirname, 'seeds', 'initialRoles'));
const createInitialAdmin = require(path.join(__dirname, 'seeds', 'initialAdmin'));
const saveImagesToCloudinary = require(path.join(__dirname, 'middlewares', 'SaveImagesToCloudinary'));

// initialize
require(path.join(__dirname, 'database.js'));
const app = express();
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(configData);
app.use((req, res, next) => {
    upload.fields(req.fieldsAvailable)(req, res, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
        } else {
            next();
        }
    });
});
app.use(saveImagesToCloudinary);

// configs
// InitAgenda();

// seeds
createInitialAdmin();
createInitialRoles();

// routes
const routeFiles = fs.readdirSync(path.join(__dirname, 'routes')).filter( (file) => file.endsWith(".js") );

routeFiles.forEach( (file) => {
    app.use(`/api/${file.split('.')[0]}`, require(path.join(__dirname, 'routes', file)));
    console.log(`Route: /api/${file.split('.')[0]} loaded!` );
});

console.log(routeFiles);

module.exports = app; 