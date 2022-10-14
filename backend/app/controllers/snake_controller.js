const FormatError = require('../utils/responseApi.js').FormatError;
const db_users = require('../config/config_db')

async function getall_users(req, res) {
    try {
        res.json(db_users);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category

async function log_user(req, res) {
    try {
        console.log(db_users)
        const users = db_users.find(user =>{
            return user.username == JSON.parse(req.params.name) && user.password == JSON.parse(req.params.password)
        });
        res.json(users);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category

async function register_user(req, res) {
    let msg = "User_already_exist";
    try {

        const confirm_user = db_users.find(user =>{
            return user.username == req.body.input_username && user.password == req.body.input_password
        });
        if (confirm_user == null) {
            db_users.push({ username: req.body.input_username, password: req.body.input_password });
            res.json("Registered");
            
        }else{
            res.json(msg);
        }
    } catch {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}

const snake_controller = {
    getall_users: getall_users,
    log_user: log_user,
    register_user: register_user
}

module.exports = snake_controller;