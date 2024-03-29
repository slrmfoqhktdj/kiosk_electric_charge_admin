const express = require('express')
const router = express.Router()
const charge_management = require('../controllers/charge-management')
const auth = require('../middlewares/auth')

router.get('/devicelist',charge_management.getdevicelist)       // 충전기 기본 정보
router.get('/devicestatelist',charge_management.getdevicestatelist)     // 충전기 상태 정보
router.get('/pricelist',charge_management.getpricelist)         // 충전요금 단가 관리

router.post('/device/register',auth.isAuthenticated,charge_management.insertdevice)  // 충전기 등록
router.post('/device/update',charge_management.updatedevice)  // 충전기 수정
router.post('/device/remove',auth.isAuthenticated,charge_management.removedevice)    // 충전기 삭제


module.exports = router