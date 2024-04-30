// const dbc = require('../db/dbc')
const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getdevicelist = async (request, response, next) => {  
    console.log('c_getdevicelist')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/devicelist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{s_order:request.params.s_order,e_order:request.params.e_order},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }



}

const getdevicelist_search = async (request, response, next) => {  
    console.log('c_getdevicelist_search')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/devicelist/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{column:request.params.column,data:request.params.data},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }

}

const getdevicestatelist = async (request, response, next) => {
    console.log('c_getdevicestatelist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/devicestatelist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{s_order:request.params.s_order,e_order:request.params.e_order},
        })

        response.send(comfirm.data);

    
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }


    


    // console.log(result)

}

const getdevicestatelist_search = async (request, response, next) => {
    console.log('c_getdevicestatelist_search')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/devicestatelist/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{column:request.params.column,data:request.params.data},
        })

        response.send(comfirm.data);

    
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }


    


    // console.log(result)

}


const getpricelist = async (request, response, next) => {
    console.log('c_getpricelist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/pricemng'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{s_order:request.params.s_order,e_order:request.params.e_order},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }



}


const getpricelist_search = async (request, response, next) => {
    console.log('c_getpricelist_search')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/pricemng/search'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
            params:{column:request.params.column,data:request.params.data},
        })

        response.send(comfirm.data);
        
    }catch(e){
        if(e.response?.status==401){
            request.session.destroy()
            response.send(401)
        }else{
            console.log("err : "+e);
            response.send(result);
        }
    }



}

const insertprice = async (request, response, next) =>{
    console.log('c_insertdevice')

    const price = request.body.price
    const writer = request.body.writer


    const sendInsertResultData = {
        isInserted:false,
        errorMessage :""
    };

    if(writer && price){
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/price/register'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    price: price,
                    writer: writer,
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

                sendInsertResultData.isInserted = true
                response.send(sendInsertResultData)
            }else{
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
                // response.redirect(response.locals.base)
            }
            

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
            }
        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendInsertResultData.isInserted = false
        sendInsertResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendInsertResultData)
        // response.redirect(response.locals.base)
    }
}

const removeprice = async (request, response, next) =>{
    console.log('c_removeprice')

    const id = request.body.id
    const writer = request.body.writer

    const sendRemoveResultData = {
        isRemoved:false,
        errorMessage :""
    };

    if(id && writer ){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/price/deleter'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    writer: writer,
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            
            if(result){

                sendRemoveResultData.isRemoved = true
                response.send(sendRemoveResultData)
            }else{
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
                // response.redirect(response.locals.base)
            }

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
            }

        }
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendRemoveResultData.isRemoved = false
        sendRemoveResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendRemoveResultData)
        // response.redirect(response.locals.base)
    }
}

const insertdevice = async (request, response, next) =>{
    console.log('c_insertdevice')

    const id = request.body.id
    const latitude = request.body.latitude
    const longitude = request.body.longitude
    const addr = request.body.addr
    const s_version = request.body.s_version
    const h_c_m = request.body.h_c_m
    const h_p_m = request.body.h_p_m
    const h_b_m = request.body.h_b_m
    const h_w_m = request.body.h_w_m
    const enabled = request.body.enabled

    const sendInsertResultData = {
        isInserted:false,
        errorMessage :""
    };

    if(id && latitude && longitude && addr && s_version && h_c_m && h_p_m && h_b_m && h_w_m && enabled){
        let comfirm;            /// ocpp 연결 여부 

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/device/register'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    latitude: latitude,
                    longitude:longitude,
                    addr:addr,
                    s_version:s_version,
                    h_c_m:h_c_m,
                    h_p_m:h_p_m,
                    h_b_m:h_b_m,
                    h_w_m:h_w_m,
                    enabled:enabled
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            if(result){

                sendInsertResultData.isInserted = true
                response.send(sendInsertResultData)
            }else{
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
                // response.redirect(response.locals.base)
            }

        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendInsertResultData.isInserted = false
                sendInsertResultData.errorMessage = "등록에 실패했습니다"
                response.send(sendInsertResultData)
            }
        }


        
        
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendInsertResultData.isInserted = false
        sendInsertResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendInsertResultData)
        // response.redirect(response.locals.base)
    }
}



const updatedevice = async (request, response, next) =>{
    console.log('c_updatedevice')

    const id = request.body.id
    const latitude = request.body.latitude
    const longitude = request.body.longitude
    const addr = request.body.addr
    const s_version = request.body.s_version
    const h_c_m = request.body.h_c_m
    const h_p_m = request.body.h_p_m
    const h_b_m = request.body.h_b_m
    const h_w_m = request.body.h_w_m
    const enabled = request.body.enabled

    const sendUpdateResultData = {
        isUpdated:false,
        errorMessage :""
    };

    if(id && latitude && longitude && addr && s_version && h_c_m && h_p_m && h_b_m && h_w_m && enabled){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/device/updater'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    latitude: latitude,
                    longitude:longitude,
                    addr:addr,
                    s_version:s_version,
                    h_c_m:h_c_m,
                    h_p_m:h_p_m,
                    h_b_m:h_b_m,
                    h_w_m:h_w_m,
                    enabled:enabled
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            
            if(result){
    
                sendUpdateResultData.isUpdated = true
                response.send(sendUpdateResultData)
            }else{
                if(e.response?.status==401){
                    request.session.destroy()
                    response.send(401)
                }else{
                    console.log("err : "+e);
                    sendUpdateResultData.isUpdated = false
                    sendUpdateResultData.errorMessage = "수정에 실패했습니다"
                    response.send(sendUpdateResultData)
                }
                // response.redirect(response.locals.base)
            }

            
        }catch(e){
            console.log("err : "+e);
            sendUpdateResultData.isUpdated = false
            sendUpdateResultData.errorMessage = "수정에 실패했습니다"
            response.send(sendUpdateResultData)
        }

        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendUpdateResultData.isUpdated = false
        sendUpdateResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendUpdateResultData)
        // response.redirect(response.locals.base)
    }
}

const removedevice = async (request, response, next) =>{
    console.log('c_removedevice')

    const id = request.body.id
    const latitude = request.body.latitude
    const longitude = request.body.longitude

    const sendRemoveResultData = {
        isRemoved:false,
        errorMessage :""
    };

    if(id && latitude && longitude ){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/device/deleter'),
                headers: { Authorization: `Bearer ${request.session.user.name}` },
                data: {
                    id: id,
                    latitude: latitude,
                    longitude:longitude,
                } 
            })


            const result = comfirm.data.item;
            // console.log(result)
            
            if(result){

                sendRemoveResultData.isRemoved = true
                response.send(sendRemoveResultData)
            }else{
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
                // response.redirect(response.locals.base)
            }

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendRemoveResultData.isRemoved = false
                sendRemoveResultData.errorMessage = "삭제에 실패했습니다"
                response.send(sendRemoveResultData)
            }
        }


        
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendRemoveResultData.isRemoved = false
        sendRemoveResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendRemoveResultData)
        // response.redirect(response.locals.base)
    }
}


const showsettings = async (request, response, next) =>{
    console.log('c_showsettings')

    const id = request.body.device_id
    const GetConfiguration_key = []


    const sendshowsettingsResultData = {
        isShow:false,
        errorMessage :"",
        data:""
    };

    if(id){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/gcfr',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   key:GetConfiguration_key
                }
            })


            
            sendshowsettingsResultData.isShow = true
            sendshowsettingsResultData.data = comfirm.data.configurationKey
            response.send(sendshowsettingsResultData)

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendshowsettingsResultData.isShow = false
                sendshowsettingsResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendshowsettingsResultData)
            }
        }


        
        
    }else{
        sendshowsettingsResultData.isShow = false
        sendshowsettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendshowsettingsResultData)
    }
}



const updatesettings = async (request, response, next) =>{
    console.log('c_updatesettings')

    const id = request.body.device_id
    const key =  request.body.key
    const value =  request.body.value

    const sendupdatesettingsResultData = {
        isUpdated:false,
        errorMessage :"",
    };

    if(id&&key){

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/ccfr',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                   key:key,
                   value:value
                }
            })


            
            const getData = comfirm.data.status

            if(getData == "Accepted"){
                sendupdatesettingsResultData.isUpdated = true
            }else if(getData == "NotSupported"){
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "지원하지 않는 형식의 명령입니다."
            }else if(getData == "Rejected"){
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "설정변경에 실패했습니다. "
            }else{
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "적용하려면 기기를 재부팅해야합니다. "
            }

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendupdatesettingsResultData.isUpdated = false
                sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendupdatesettingsResultData)
            }
        }


        
        
    }else{
        sendupdatesettingsResultData.isUpdated = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}


const remoteStartTransaction = async (request, response, next) =>{
    console.log('c_remoteStartTransaction')

    const id = request.body.device_id
    const connectorId =  request.body.connectorId
    const idTag =  request.body.idTag

    const sendupdatesettingsResultData = {
        isStarted:false,
        errorMessage :"",
    };


    if(id&&connectorId&&idTag){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/rmstt',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                    connectorId:Number(connectorId),
                    idTag:idTag
                }
            })


            

            const getData = comfirm.data.status

            if(getData == "Accepted"){
                sendupdatesettingsResultData.isStarted = true
            }else if(getData == "Rejected"){
                sendupdatesettingsResultData.isStarted = false
                sendupdatesettingsResultData.errorMessage = "원격충전이 거절당했습니다. 해당 커넥터가 사용가능한지 다시 확인해주세요."
            }

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendupdatesettingsResultData.isStarted = false
                sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendupdatesettingsResultData)
            }
        }


        
        
    }else{
        sendupdatesettingsResultData.isStarted = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}

const cacheClear = async (request, response, next) =>{
    console.log('c_cacheClear')

    const id = request.body.device_id

    const sendResultData = {
        isCleared:false,
        errorMessage :"",
    };


    if(id){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/cc',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}` ,
                },
                data:{}
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isCleared = true
            }else if(getData == "Rejected"){
                sendResultData.isCleared = false
                sendResultData.errorMessage = "인증캐쉬삭제가 거절당했습니다. "
            }

            response.send(sendResultData)

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isCleared = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isCleared = false
        sendResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendResultData)
    }
}


const Reset = async (request, response, next) =>{
    console.log('c_Reset')

    const id = request.body.device_id
    const Type = request.body.Type

    const sendResultData = {
        isReseted:false,
        errorMessage :"",
    };


    if(id&&Type){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/rs',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                    Type:Type
                }
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isReseted = true
            }else if(getData == "Rejected"){
                sendResultData.isReseted = false
                sendResultData.errorMessage = "재시작 명령이 거절당했습니다. "
            }

            response.send(sendResultData)

            
        }catch(e){
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isReseted = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isReseted = false
        sendResultData.errorMessage = "선택된 옵션이 없습니다."
        response.send(sendResultData)
    }
}


const nvcatSettings = async (request, response, next) =>{
    console.log('c_nvcatSettings')

    const id = request.body.device_id
    const vendor_id = "NVCAT"
    const message_id = "NVCATSetup"
    const cat_id = msg.NVCAT_Setting_Catid
    const bizno = msg.NVCAT_Setting_Bizno
    const server_ip = msg.NVCAT_Setting_Serverip
    const server_port = msg.NVCAT_Setting_ServerPort

    const settingdata = "{'Catid':'"+cat_id+"','Bizno':'"+bizno+"','Serverip':'"+server_ip+"','ServerPort':'"+server_port+"'}"

    const sendResultData = {
        isSetting:false,
        errorMessage :"",
    };


    if(id&&cat_id&&bizno&&server_ip&&server_port){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/ncs',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                    vendorId:vendor_id,
                    messageId:message_id,
                    data: settingdata
                }
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isSetting = true
            }else if(getData == "Rejected"){
                sendResultData.isSetting = false
                sendResultData.errorMessage = "재설정이 거절당했습니다. "
            }else if(getData == "UnknownVendorId"){
                sendResultData.isSetting = false
                sendResultData.errorMessage = "알 수 없는 업체명입니다. "
            }else if(getData == "UnknownMessageId"){
                sendResultData.isSetting = false
                sendResultData.errorMessage = "알 수 없는 메시지유형입니다. "
            }

            response.send(sendResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isSetting = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isSetting = false
        sendResultData.errorMessage = "빠진 입력값이 있습니다."
        response.send(sendResultData)
    }
}


const nvcatRestart = async (request, response, next) =>{
    console.log('c_nvcatRestart')

    const id = request.body.device_id
    const vendor_id = "NVCAT"
    const message_id = "NVCATRestart"

    const sendResultData = {
        isReseted:false,
        errorMessage :"",
    };


    if(id){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/ncrs',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                    vendorId:vendor_id,
                    messageId:message_id,
                }
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isReseted = true
            }else if(getData == "Rejected"){
                sendResultData.isReseted = false
                sendResultData.errorMessage = "재시작 명령이 거절당했습니다. "
            }else if(getData == "UnknownVendorId"){
                sendResultData.isReseted = false
                sendResultData.errorMessage = "알 수 없는 업체명입니다. "
            }else if(getData == "UnknownMessageId"){
                sendResultData.isReseted = false
                sendResultData.errorMessage = "알 수 없는 메시지유형입니다. "
            }


            response.send(sendResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isReseted = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isReseted = false
        sendResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendResultData)
    }
}

const connectorEnabled = async (request, response, next) =>{
    console.log('c_connectorEnabled')

    const id = request.body.device_id
    const ConnectorId = request.body.ConnectorId
    const Type = request.body.Type

    const sendResultData = {
        isEnabled:false,
        errorMessage :"",
    };


    if(id&&ConnectorId&&Type){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/cgab',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:{
                    ConnectorId:Number(ConnectorId),
                    Type:Type
                }
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isEnabled = true
            }else if(getData == "Rejected"){
                sendResultData.isEnabled = false
                sendResultData.errorMessage = "설정 명령이 거절당했습니다. "
            }else if(getData == "Scheduled"){
                sendResultData.isEnabled = false
                sendResultData.errorMessage = "요청이 수락되었으며 진행 중인 트랜잭션이 완료되면 실행됩니다. "
            }


            response.send(sendResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isEnabled = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다."
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isEnabled = false
        sendResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendResultData)
    }
}


const triggerMessage = async (request, response, next) =>{
    console.log('c_triggerMessage')

    const id = request.body.device_id
    const ConnectorId = request.body.ConnectorId
    const requestedMessage = request.body.requestedMessage

    const sendResultData = {
        isReceived:false,
        errorMessage :"",
    };

    if(id&&requestedMessage){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/tgmg',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id,
                    Authorization: `Bearer ${request.session.user.name}`,
                },
                data:ConnectorId?
                {
                    ConnectorId:Number(ConnectorId),
                    requestedMessage:requestedMessage
                }
                :
                {
                    requestedMessage:requestedMessage
                }
            })


            

            const getData = comfirm.data.status


            if(getData == "Accepted"){
                sendResultData.isReceived = true
            }else if(getData == "Rejected"){
                sendResultData.isReceived = false
                sendResultData.errorMessage = "설정 명령이 거절당했습니다. "
            }else if(getData == "Scheduled"){
                sendResultData.isReceived = false
                sendResultData.errorMessage = "요청이 수락되었으며 진행 중인 트랜잭션이 완료되면 실행됩니다. "
            }


            response.send(sendResultData)

            
        }catch(e){
            
            if(e.response?.status==401){
                request.session.destroy()
                response.send(401)
            }else{
                console.log("err : "+e);
                sendResultData.isReceived = false
                sendResultData.errorMessage = "명령 전송에 실패했습니다. "
                response.send(sendResultData)
            }
        }


        
        
    }else{
        sendResultData.isReceived = false
        sendResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendResultData)
    }
}



module.exports = {
    getdevicelist,
    getdevicelist_search,
    getdevicestatelist,
    getdevicestatelist_search,
    getpricelist,
    getpricelist_search,
    insertprice,
    removeprice,
    insertdevice,
    updatedevice,
    removedevice,
    showsettings,
    updatesettings,
    remoteStartTransaction,
    cacheClear,
    Reset,
    nvcatSettings,
    nvcatRestart,
    connectorEnabled,
    triggerMessage,
}