const axios = require('axios')
require('dotenv').config({ path:'../.env'});


const getMapData = async (request, response, next) => {
    console.log('c_getMapData')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/maplist')
        })
        // console.log(comfirm.data)

        const rows = comfirm.data.item

        for(i = 0; i < rows.length; i ++){
            const sendDeviceMapData ={
                id: rows[i].id,
                position : {lat:parseFloat(rows[i].position.latitude),lng:parseFloat(rows[i].position.longitude)},
                addr:rows[i].addr,
            }
    
            result.push(sendDeviceMapData)
        }
    
        
    }catch(e){
        console.log("err : "+e);
    }

    response.send(result);

}


module.exports = {
    getMapData
}