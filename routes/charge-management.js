const express = require('express')
const router = express.Router()
const charge_management = require('../controllers/charge-management')

router.get('/devicelist',charge_management.getdevicelist)
router.get('/devicestatelist',charge_management.getdevicestatelist)
router.get('/pricelist',charge_management.getpricelist)


module.exports = router