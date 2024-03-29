const express = require('express')
const router = express.Router()
const analysis = require('../controllers/analysis')

router.get('/charge_amount_history',analysis.getcharge_amount_history)  // 충전량 및 이력 조회
router.get('/charge_daily_list',analysis.getcharge_daily_list)  // 충전량 및 이력 조회
router.post('/charge_daily_graph',analysis.getcharge_daily_graph)    //충전기 그래프 조회
router.get('/charge_error_history',analysis.getcharge_error_history)    // 충전기 장애이력


module.exports = router