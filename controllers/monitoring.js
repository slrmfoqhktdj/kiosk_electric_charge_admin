const dbc = require('../db/dbc')

const getMapData = async (request, response, next) => {
    console.log('c_getMapData')

    let result = []

    const rows = await dbc.getMapData()

    for(i = 0; i < rows.length; i ++){
        const sendDeviceMapData ={
            id: rows[i].id,
            position : {lat:parseFloat(rows[i].latitude),lng:parseFloat(rows[i].longitude)},
            addr:rows[i].addr,
        }

        result.push(sendDeviceMapData)
    }

    response.send(result);
}


module.exports = {
    getMapData
}