const {Schema, model} = require('mongoose');
const uuid = require('uuid');

const userSchema = new Schema({
    _id: {type: String, default: uuid.v4},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true}
});

module.exports = model('users', userSchema);