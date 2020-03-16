const express = require('express')
const { createUser, getUser } = require('../controllers/userControllers')

const router = express.Router()

router
.route('/')
.get(getUser)
.post(createUser)

module.exports = router;
