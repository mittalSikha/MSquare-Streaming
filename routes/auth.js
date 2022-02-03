const express = require('express');
const authController = require('../controllers/auth');
const path = require('path');
const authControllers = require('../controllers/auths');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/watchlist', authControllers.addWatch);

router.post('/watched', authController.addWatched);

module.exports = router;
