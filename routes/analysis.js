const express = require('express')
const router = express.Router()
const analysis = require('../controllers/analysis')

router.get('/charge_amount_history',analysis.getcharge_amount_history)


module.exports = router