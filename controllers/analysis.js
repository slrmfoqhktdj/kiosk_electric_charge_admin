const dbc = require('../db/dbc')



const getcharge_amount_history = async (request, response, next) => {
    console.log('c_getcharge_amount_history')

    let result = []

    const rows = await dbc.getcharge_amount_history()

    for(i = 0; i < rows.length; i ++){
        const sendcharge_amount_historyListData ={
            id: rows[i].PAYID,
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
            c_time_s:rows[i].c_time_s,
            c_time_e:rows[i].c_time_e,
            c_time_u:rows[i].c_time_u

        }

        result.push(sendcharge_amount_historyListData)
    }

    response.send(result);
}

const getcharge_daily_list = async (request, response, next) => {
    console.log('c_getcharge_daily_list')

    let result = []

    const rows = await dbc.getcharge_daily_list()

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

        console.log(rows[i].day)

        result.push(sendcharge_daily_ListData)
    }

    response.send(result);
}

const getcharge_daily_graph = async (request, response, next) => {
    console.log('c_getcharge_daily_graph')

    const StartTime = request.body.starttime
    const EndTime = request.body.endtime
    // const DeviceType = request.body.devicetype

    let result = []

    const rows = await dbc.getcharge_daily_graph(StartTime,EndTime)

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
}


const getcharge_error_history = async (request, response, next) => {
    console.log('c_getcharge_error_history')

    let result = []

    const rows = await dbc.getcharge_error_history()

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

    response.send(result);
}


module.exports = {
    getcharge_amount_history,
    getcharge_daily_list,
    getcharge_daily_graph,
    getcharge_error_history
}