const express = require('express')
const router = express.Router()
const monitoring = require('../controllers/monitoring')

router.get('/mapdata',monitoring.getMapData)


module.exports = router