const axios = require('axios')
require('dotenv').config({ path:'../.env'});


const getcharge_amount_history = async (request, response, next) => {
    console.log('c_getcharge_amount_history')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/chargelist')
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
            const sendcharge_amount_historyListData ={
                id: rows[i].payid,
                device: rows[i].d_id,
                pay:rows[i].c_pay,
                can_pay:rows[i].can_pay,
                pay_by:rows[i].pay_by,
                c_num:rows[i].c_num,
                c_c_num:rows[i].c_c_num,
                pay_day:rows[i].pay_day,
                c_pay_day:rows[i].c_pay_day,
                c_conn:rows[i].c_conn,
                c_time:rows[i].c_time,
                c_amount:rows[i].c_amount,
                c_time_s:rows[i].c_time_s?  new Date(rows[i].c_time_s).toLocaleString() : null,
                c_time_e:rows[i].c_time_e?  new Date(rows[i].c_time_e).toLocaleString() : null,
                c_time_u:rows[i].c_time_u?  new Date(rows[i].c_time_u).toLocaleString() : null

            }

            result.push(sendcharge_amount_historyListData)
        }
    }catch(e){
        console.log("err : "+e);
    }


    

    response.send(result);
}

const getcharge_daily_list = async (request, response, next) => {
    console.log('c_getcharge_daily_list')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/chargedailylist')
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
            if(rows[i].day == null){
                continue;
            }
    
            const sendcharge_daily_ListData ={
                id: rows[i].day,
                amount: rows[i].amount,
                count:rows[i].count,
                pay:rows[i].pay,
            }
    
            // console.log(rows[i].day)
    
            result.push(sendcharge_daily_ListData)
        }
    
        response.send(result);
    }catch(e){
        console.log("err : "+e);
    }

    
}


const getcharge_daily_graph_list = async (request, response, next) => {
    console.log('c_getcharge_daily_graph_list')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/chargedailygraphlist'),
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
    
            const sendcharge_daily_GraphData ={
                device_id: rows[i].id,
            }
    
    
            result.push(sendcharge_daily_GraphData)
        }
    
        response.send(result);
    }catch(e){
        console.log("err : "+e);
    }
    // const rows = await dbc.getcharge_daily_graph(StartTime,EndTime)

    
}

const getcharge_daily_graph = async (request, response, next) => {
    console.log('c_getcharge_daily_graph')

    const StartTime = request.body.starttime
    const EndTime = request.body.endtime
    const Device = request.body.device_id
    // const DeviceType = request.body.devicetype

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'POST',
            url:process.env.OCPPURL.concat('/chargedailygraph'),
            data: {
                starttime: StartTime,
                endtime: EndTime,
                device_id: Device
            } 
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
            if(rows[i].time == null){
                continue;
            }
    
            const sendcharge_daily_GraphData ={
                time: rows[i].time,
                amount: rows[i].amount,
                count:rows[i].count,
                pay:rows[i].pay,
            }
    
            // console.log(rows[i].time)
    
            result.push(sendcharge_daily_GraphData)
        }
    
        response.send(result);
    }catch(e){
        console.log("err : "+e);
    }
    // const rows = await dbc.getcharge_daily_graph(StartTime,EndTime)

    
}


const getcharge_error_history = async (request, response, next) => {
    console.log('c_getcharge_error_history')

    let result = []

    let comfirm;            /// ocpp 연결 여부 
    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/errlist')
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
            const sendcharge_error_historyListData ={
                id: rows[i].id,
                d_id: rows[i].d_id,
                d_error:rows[i].d_error,
                v_id:rows[i].v_id,
                v_error:rows[i].v_error,
                e_info:rows[i].e_info,
                o_time:rows[i].o_time,

            }

            result.push(sendcharge_error_historyListData)
        }
    }catch(e){
        console.log("err : "+e);
    }
    

    response.send(result);
}


const remoteStopTransaction = async (request, response, next) =>{
    console.log('c_remoteStopTransaction')

    const id = request.body.device_id
    const TransactionId =  request.body.TransactionId

    const sendupdatesettingsResultData = {
        isStopped:false,
        errorMessage :"",
    };


    if(id&&TransactionId){
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/rmstp',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id
                },
                data:{
                    TransactionId:Number(TransactionId)
                }
            })


            

            const getData = comfirm.data.status

            if(getData == "Accepted"){
                sendupdatesettingsResultData.isStopped = true
            }else if(getData == "Rejected"){
                sendupdatesettingsResultData.isStopped = false
                sendupdatesettingsResultData.errorMessage = "원격중지가 거절당했습니다. "
            }

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            console.log("err : "+e);
            sendupdatesettingsResultData.isStopped = false
            sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
            response.send(sendupdatesettingsResultData)
        }


        
        
    }else{
        sendupdatesettingsResultData.isStopped = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}


const remoteCanclePay = async (request, response, next) =>{
    console.log('c_remoteCanclePay')

    const id = request.body.device_id
    
    const vendor_id = "NVCAT"
    const message_id = "NVCATCancle"

    const PayNum =  request.body.PayNum
    const OriginPay = request.body.OriginPay;
    const PayDay = request.body.PayDay;
    const PayToken = request.body.PayToken;
    const CanclePay = request.body.CanclePay;

    const sendupdatesettingsResultData = {
        isCancled:false,
        errorMessage :"",
    };


    if(id&&PayNum&&OriginPay&&PayDay&&PayToken){

        const settingdata = "{'PayNum':'"+PayNum+"','CanclePay':'"+CanclePay+"','OriginPay':'"+OriginPay+"','PayDay':'"+PayDay+"','PayToken':'"+PayToken+"'}"
        
        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL+'/command/nccp',
                // headers:{
                //     'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                //     Authorization: `Bearer ${token.data.access_token}`
                // },
                headers:{
                    Id:id
                },
                data:{
                    vendorId:vendor_id,
                    messageId:message_id,
                    data:settingdata
                }
            })


            

            const getData = comfirm.data.status

            if(getData == "Accepted"){
                sendupdatesettingsResultData.isCancled = true
            }else if(getData == "Rejected"){
                sendupdatesettingsResultData.isCancled = false
                sendupdatesettingsResultData.errorMessage = "원격취소가 거절당했습니다. "
            }else if(getData == "UnknownMessageId"){
                sendupdatesettingsResultData.isCancled = false
                sendupdatesettingsResultData.errorMessage = "알수없는 메시지 형식입니다. "
            }else{
                sendupdatesettingsResultData.isCancled = false
                sendupdatesettingsResultData.errorMessage = "알수없는 공급사입니다. "
            }

            response.send(sendupdatesettingsResultData)

            
        }catch(e){
            console.log("err : "+e);
            sendupdatesettingsResultData.isCancled = false
            sendupdatesettingsResultData.errorMessage = "명령 전송에 실패했습니다."
            response.send(sendupdatesettingsResultData)
        }


        
        
    }else{
        sendupdatesettingsResultData.isCancled = false
        sendupdatesettingsResultData.errorMessage = "선택된 기기가 없습니다."
        response.send(sendupdatesettingsResultData)
    }
}

module.exports = {
    getcharge_amount_history,
    getcharge_daily_list,
    getcharge_daily_graph_list,
    getcharge_daily_graph,
    getcharge_error_history,
    remoteStopTransaction,
    remoteCanclePay,
}