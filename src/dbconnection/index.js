const mongoose  = require('mongoose');

const DB_URL = 'mongodb+srv://lab89:lab89@cluster0.tyx3s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('DB connected'))
    .catch(e => console.log(e));

module.exports = mongoose;