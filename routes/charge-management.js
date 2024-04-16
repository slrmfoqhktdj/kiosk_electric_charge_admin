const express = require('express')
const router = express.Router()
const charge_management = require('../controllers/charge-management')
const auth = require('../middlewares/auth')

router.get('/devicelist',charge_management.getdevicelist)       // 충전기 기본 정보
router.get('/devicestatelist',charge_management.getdevicestatelist)     // 충전기 상태 정보
router.get('/pricelist',charge_management.getpricelist)         // 충전요금 단가 관리

// router.post('/device/register',auth.isAuthenticated,charge_management.insertdevice)  // 충전기 등록
router.post('/device/register',charge_management.insertdevice)  // 충전기 등록
router.post('/device/update',charge_management.updatedevice)  // 충전기 수정
router.post('/device/remove',charge_management.removedevice)    // 충전기 삭제
router.post('/price/register',charge_management.insertprice)    // 요금단가 추가
router.post('/price/remove',charge_management.removeprice)    // 요금단가 삭제



router.post('/cmd/showsettings',charge_management.showsettings)  //기기 설정값 리턴 명령
router.post('/cmd/updatesettings',charge_management.updatesettings)  //기기 설정값 재설정 명령

router.post('/cmd/rmstt',charge_management.remoteStartTransaction)  //기기 원격 충전시작 명령

router.post('/cmd/cc',charge_management.cacheClear)  //기기 인증캐쉬 삭제 명령

router.post('/cmd/rs',charge_management.Reset)  //기기 재시작 명령

router.post('/cmd/ncs',charge_management.nvcatSettings)  //nvcat 재설정 명령

router.post('/cmd/ncrs',charge_management.nvcatRestart)  //nvcat 재시작 명령

router.post('/cmd/cgab',charge_management.connectorEnabled)     //커넥터 사용 가능 설정 명령

router.post('/cmd/tgmg',charge_management.triggerMessage)     //트리거 명령

module.exports = router