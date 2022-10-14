const mongoose = require('mongoose');

const users_shcema = new mongoose.Schema({
    user_name: String,
    user_password: String,
});

mongoose.model('Users', users_shcema);