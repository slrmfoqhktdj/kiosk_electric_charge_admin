const express = require('express')
const router = express.Router()
const setting = require('../controllers/setting')
const authMiddleware = require('../middlewares/auth')

router.get('/publiccode',authMiddleware.isAuthenticated,setting.getPublicCode)


module.exports = router