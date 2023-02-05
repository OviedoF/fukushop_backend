const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.iwwsjqo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', true);

mongoose.connect(uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log(`[DATABASE] ✨✨ DB is connected succesfully!`))
    .catch(err => console.log(err));

module.exports = mongoose;

