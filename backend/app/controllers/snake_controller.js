const FormatError = require('../utils/responseApi.js').FormatError;
// const db_users = require('../config/config_db')


async function getall_users(req, res) {
    try {
        res.json(global.users);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_category

async function log_user(req, res) {
    try {
        const users = global.users.find(user => {
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
        if (!req.body.input_username) {
            res.status(500).json(FormatError("An error has ocurred", res.statusCode));
        } else {
            const confirm_user = global.users.find(user => {
                return user.username == req.body.input_username && user.password == req.body.input_password
            });
            if (confirm_user == null) {
                global.users.push({ username: req.body.input_username, password: req.body.input_password, score_1: 0, score_2: 0, score_3: 0 });
                res.json("Registered");

            } else {
                res.json(msg);
            }
        }
    } catch {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}

async function change_score(req, res) {
    let msg = "success";
    try {
        const confirm_user = global.users.findIndex(user => {
            return user.username == JSON.parse(req.body.user)
        });
        if (confirm_user !== -1) {
            if (req.body.score_1) {
                global.users[confirm_user].score_1 = req.body.score_1;
                res.json(msg);
            } else if (req.body.score_2) {
                global.users[confirm_user].score_2 = req.body.score_2;
                res.json(msg);
            } else if (req.body.score_3) {
                global.users[confirm_user].score_3 = req.body.score_3;
                res.json(msg);
            }
        }
    } catch {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
}

const snake_controller = {
    getall_users: getall_users,
    log_user: log_user,
    register_user: register_user,
    change_score: change_score
}

module.exports = snake_controller;