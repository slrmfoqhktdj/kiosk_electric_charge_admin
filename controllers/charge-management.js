const dbc = require('../db/dbc')

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

    response.send(result);
}

const getdevicestatelist = async (request, response, next) => {
    console.log('c_getdevicestatelist')

    let result = []

    const rows = await dbc.getdevicestatelist()

    for(i = 0; i < rows.length; i ++){
        const sendDeviceStateListData ={
            id: rows[i].id,
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


module.exports = {
    getdevicelist,
    getdevicestatelist,
    getpricelist
}