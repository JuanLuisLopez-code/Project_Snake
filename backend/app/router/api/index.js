var router = require('express').Router();

const snake_controller = require("../../controllers/snake_controller.js")

router.get('/snake/:name/:password', snake_controller.log_user);
router.get('/snake', snake_controller.getall_users);
router.post('/snake', snake_controller.register_user);

module.exports = router;