var db = require("../models");
var router = require("express").Router();
var {signup, login, logout} = require('../controllers/usersController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
