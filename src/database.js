const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb://127.0.0.1:27017/fukuapi`;

mongoose.set('strictQuery', true);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log(`[DATABASE] ✨✨ DB is connected succesfully!`))
    .catch(err => console.log(err));

module.exports = mongoose;

