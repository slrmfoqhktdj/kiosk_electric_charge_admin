const express = require('express')
const router = express.Router()
const update = require('../controllers/update')
const multer = require('multer')
const authMiddleware = require('../middlewares/auth')

const storagePole = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/../update_apks/POLE/")
    },
    filename: function(req,file,cb){
        cb(null,"app-debug.apk")
    }
})
const uploadPolefunction = multer({storage:storagePole})

const storageTwin = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+"/../update_apks/TWIN/")
    },
    filename: function(req,file,cb){
        cb(null,"app-debug.apk")
    }
})
const uploadTwinfunction = multer({storage:storageTwin})


router.get('/apkfilelist',authMiddleware.isAuthenticated,update.getApkfilelist)    // 프로그램 업로드 페이지 리스트
router.get('/deviceswlist/:s_order/:e_order',authMiddleware.isAuthenticated,update.getDeviceswlist)  // 충전기 업데이트 페이지 리스트

router.get('/deviceswlist/search/:column/:data',authMiddleware.isAuthenticated,update.getDeviceswlist_search)   // 충전기 업데이트 페이지 검색


router.post('/upload/pole',authMiddleware.isAuthenticated,uploadPolefunction.single('apkfile'),update.uploadApk)   //폴 apk 업로드
router.post('/upload/twin',authMiddleware.isAuthenticated,uploadTwinfunction.single('apkfile'),update.uploadApk)   //트윈 apk 업로드
router.post('/command/upd',authMiddleware.isAuthenticated,update.commandUpdateFirmWare)    // 충전기 업데이트 명령

// router.post('/apks',update.)    // apk 파일 공유

module.exports = router