const express = require('express')
const router = express.Router()
const setting = require('../controllers/setting')

router.get('/publiccode',setting.getPublicCode)


module.exports = router