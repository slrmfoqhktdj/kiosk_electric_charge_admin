const fs = require('fs');
const axios = require('axios')
require('dotenv').config({ path:'../.env'});


const getApkfilelist = async (request, response, next) => {
    console.log('c_getApkfilelist')

    // const offset = 1000 * 60 * 60 * 9

    const polepath = __dirname+"/../update_apks/POLE";
    const twinpath = __dirname+"/../update_apks/TWIN";

    let result = {pole:"",twin:""}

    let poleresult = [];
    let twinresult = [];

    const polerows = fs.readdirSync(polepath);
    const twinrows = fs.readdirSync(twinpath);

    for(i = 0; i < polerows.length; i ++){
        
        const getT = fs.statSync(polepath+"/"+polerows[i]).mtime        // node js 는 시스템 로컬 타임과 관계없이 UTC로 반환함
        const CreateDay = new Date(getT).toLocaleString()       // 한국 시간 변환

        const sendFileListData ={
            id: polerows[i],
            // version : "rows[i].code",
            u_time: CreateDay,
        }
        poleresult.push(sendFileListData)
    }
    
    for(i = 0; i < twinrows.length; i ++){
        
        const getT = fs.statSync(twinpath+"/"+twinrows[i]).mtime        // node js 는 시스템 로컬 타임과 관계없이 UTC로 반환함
        const CreateDay = new Date(getT).toLocaleString()       // 한국 시간 변환

        const sendFileListData ={
            id: twinrows[i],
            // version : "twinrows[i].code",
            u_time: CreateDay,
        }
        twinresult.push(sendFileListData)
    }

    result.pole = poleresult
    result.twin = twinresult


    response.send(result);
}

const getDeviceswlist = async (request, response, next) => {  
    console.log('c_getDeviceswlist')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/deviceupdatelist')
        })

        const rows = comfirm.data.item

        if(rows != null && rows.length>0){  // 응답이 없을경우
            for(i = 0; i < rows.length; i ++){
                const sendDeviceUpdateListData ={ 
                    id: rows[i].id,
                    addr:rows[i].addr,
                    s_version:rows[i].s_version,
                    f_state:rows[i].f_state,
                    i_time:rows[i].i_time,
                    u_time:rows[i].u_time,
                }
        
                result.push(sendDeviceUpdateListData)
            }
        }
    
    }catch(e){
        console.log("err : "+e);
    }



    response.send(result);
}

const uploadApk = async (request, response, next) => {
    console.log('c_UploadApk')

    // // const file = request.file;
    // console.log(request.file)

    let result = {
        isUploaded:true,
        errorMessage:""
    }

    if(response.error){
        result.isUploaded = false
        result.errorMessage = response.error
    }

    response.send(result);
}


const commandUpdateFirmWare = async (request, response, next) => {  
    console.log('c_commandUpdateFirmWare')

    const msg = request.body
    const device_id = msg.device_id
    const version = msg.version

    // let filename = msg.UpdateFirmwarefilename
    const Retries = Number(msg.Retries)
    const RetrieveDate = new Date(msg.RetrieveDate).toISOString()
    const RetryInterval = Number(msg.RetryInterval)

    console.log(msg)
    console.log(request.headers.host)

    let result = {
        isUpdated:true,
        errorMessage:""
    }

    const type = device_id.split("_")[0]

    console.log(request.protocol+"//"+request.headers.host+"/"+type.toUpperCase()+"/app-debug.apk")

    const path =  type.toUpperCase()+"/app-debug.apk"


    if(!fs.existsSync(__dirname+"/../update_apks/"+type.toUpperCase())){
        result.isUpdated = false
        result.errorMessage = "충전기 타입에 따른 apk경로가 존재하지 않습니다."
        response.send(result);
        return
    }

    if(!fs.existsSync(__dirname+"/../update_apks/"+type.toUpperCase()+"/app-debug.apk")){
        result.isUpdated = false
        result.errorMessage = "업데이트할 apk가 존재하지 않습니다."
        response.send(result);
        return
    }

    

    try{

        comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/command/udfw'),
            headers:{
                Id:device_id
            },
            data:{
                Location:version+"$$"+path,
                Retries:Retries,
                RetrieveDate:RetrieveDate,
                RetryInterval:RetryInterval
            }
        })
        // console.log(comfirm.data)

    }catch(e){
        console.log("err : "+e);
         result.isUpdated = false
         result.errorMessage = e
    }

   
        
    

    response.send(result);
}

// const downloadApk = async (request, response, next) => {
//     console.log("/dapk 호출.."); 	

//     let msg = req.body
//     console.log(msg.device_id)
//     // console.log(msg.filename)
//     res.download(__dirname+"/../update_apks/"+msg.filename)
// }



module.exports = {
    getApkfilelist,
    getDeviceswlist,
    uploadApk,
    commandUpdateFirmWare,
    // downloadApk,
}