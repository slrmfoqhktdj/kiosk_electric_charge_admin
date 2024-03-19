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


module.exports = {
    getcharge_amount_history
}