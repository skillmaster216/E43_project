const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customerController')

router.post('/signup', customerController.save)
router.get('/profile/:id', customerController.profile)


module.exports = router