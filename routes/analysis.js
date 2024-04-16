const express = require('express')
const router = express.Router()
const analysis = require('../controllers/analysis')

router.get('/charge_amount_history',analysis.getcharge_amount_history)  // 충전량 및 이력 조회
router.get('/charge_daily_list',analysis.getcharge_daily_list)  // 일자별 충전량 조회
router.get('/charge_daily_graph_list',analysis.getcharge_daily_graph_list)    //충전기 그래프 조회   - 기기 리스트
router.post('/charge_daily_graph',analysis.getcharge_daily_graph)    //충전기 그래프 조회   - 그래프 값
router.get('/charge_error_history',analysis.getcharge_error_history)    // 충전기 장애이력

router.post('/cmd/rmstp',analysis.remoteStopTransaction)  //기기 원격 충전중지 명령
router.post('/cmd/nccp',analysis.remoteCanclePay)  //기기 원격 부분취소

module.exports = router