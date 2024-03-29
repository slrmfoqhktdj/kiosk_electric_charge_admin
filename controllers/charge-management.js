const dbc = require('../db/dbc')
const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getdevicelist = async (request, response, next) => {  
    console.log('c_getdevicelist')

    let result = []

    const rows = await dbc.getdevicelist()

    for(i = 0; i < rows.length; i ++){
        const sendDeviceListData ={ 
            id: rows[i].id,
            latitude: rows[i].latitude,
            longitude:rows[i].longitude,
            addr:rows[i].addr,
            s_version:rows[i].s_version,
            h_c_m:rows[i].h_c_m,
            h_p_m:rows[i].h_p_m,
            h_b_m:rows[i].h_b_m,
            h_w_m:rows[i].h_w_m,
            i_time:rows[i].i_time,
            u_time:rows[i].u_time,
            enabled:rows[i].enabled==="1"?"정상":rows[i].enabled==="2"?"보류":"불가",
        }

        result.push(sendDeviceListData)
    }

    // try{
    //     comfirm = await axios({
    //         method:'GET',
    //         url:process.env.OCPPURL.concat('/devicelist')
    //     })
    //     console.log(comfirm.data)
    // }catch(e){
    //     console.log("err : "+e);
    // }

    response.send(result);
}

const getdevicestatelist = async (request, response, next) => {
    console.log('c_getdevicestatelist')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/command/cdl')
        })
        // console.log(comfirm.data)
    }catch(e){
        console.log("err : "+e);
    }


    const rows = await dbc.getdevicestatelist()

    for(i = 0; i < rows.length; i ++){
        const sendDeviceStateListData ={
            id: rows[i].id,
            conn:comfirm.data==null?false:comfirm.data.includes(rows[i].id),
            state: rows[i].state,
            state_e:rows[i].state_e,
            v_id:rows[i].v_id,
            v_error:rows[i].v_error,
            e_info:rows[i].e_info,
            u_time:rows[i].u_time,
            f_state:rows[i].f_state,
            d_state:rows[i].d_state,
        }

        result.push(sendDeviceStateListData)
    }


    // console.log(result)

    response.send(result);
}

const getpricelist = async (request, response, next) => {
    console.log('c_getpricelist')

    let result = []

    const rows = await dbc.getpricelist()

    for(i = 0; i < rows.length; i ++){
        const sendPriceListData ={
            id: rows[i].id,
            price: rows[i].price,
            time:rows[i].time,
            writer:rows[i].writer
        }

        result.push(sendPriceListData)
    }

    response.send(result);
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
        const result = await dbc.insertdevice(id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled);
        console.log(result)
        if(result){

            sendInsertResultData.isInserted = true
            response.send(sendInsertResultData)
        }else{
            sendInsertResultData.isInserted = false
            sendInsertResultData.errorMessage = "등록에 실패했습니다"
            response.send(sendInsertResultData)
            // response.redirect(response.locals.base)
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
        const result = await dbc.updatedevice(id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled);
        console.log(result)
        if(result){

            sendUpdateResultData.isUpdated = true
            response.send(sendUpdateResultData)
        }else{
            sendUpdateResultData.isUpdated = false
            sendUpdateResultData.errorMessage = "수정에 실패했습니다"
            response.send(sendUpdateResultData)
            // response.redirect(response.locals.base)
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
        const result = await dbc.removedevice(id , latitude , longitude );
        console.log(result)
        if(result){

            sendRemoveResultData.isRemoved = true
            response.send(sendRemoveResultData)
        }else{
            sendRemoveResultData.isRemoved = false
            sendRemoveResultData.errorMessage = "수정에 실패했습니다"
            response.send(sendRemoveResultData)
            // response.redirect(response.locals.base)
        }
        
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendRemoveResultData.isRemoved = false
        sendRemoveResultData.errorMessage = "정보를 입력해주세요"
        response.send(sendRemoveResultData)
        // response.redirect(response.locals.base)
    }
}

module.exports = {
    getdevicelist,
    getdevicestatelist,
    getpricelist,
    insertdevice,
    updatedevice,
    removedevice,
}