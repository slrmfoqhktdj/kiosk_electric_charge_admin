const express = require('express')
const router = express.Router()
const monitoring = require('../controllers/monitoring')
const authMiddleware = require('../middlewares/auth')

router.get('/dashboarddata',authMiddleware.isAuthenticated,monitoring.getDashboardData)
router.get('/mapdata',authMiddleware.isAuthenticated,monitoring.getMapData)


module.exports = router