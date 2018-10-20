const express = require('express')
const router = express.Router()

const theaterController = require( '../controllers/theaterController')

router.get('/', theaterController.list)
router.get('/films/:id', theaterController.find )
router.get('/average', theaterController.average)

module.exports = router