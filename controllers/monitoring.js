const axios = require('axios')
require('dotenv').config({ path:'../.env'});

const getDashboardData = async (request, response, next) => {
    console.log('c_getDashboardData')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/dashboardlist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
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


const getMapData = async (request, response, next) => {
    console.log('c_getMapData')

    let result = []

    try{
        comfirm = await axios({
            method:'GET',
            url:process.env.OCPPURL.concat('/maplist'),
            headers: { Authorization: `Bearer ${request.session.user.name}` },
        })
        // console.log(comfirm.data)

        // const rows = comfirm.data.item

        // for(i = 0; i < rows.length; i ++){
        //     const sendDeviceMapData ={
        //         id: rows[i].id,
        //         position : rows[i].position,
        //         addr:rows[i].addr,
        //     }
    
        //     result.push(sendDeviceMapData)
        // }
    
        // response.send({key:process.env.GOOGLE_MAP_API_KEY,data:comfirm.data.item});
        response.send(comfirm.data.item);
        
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


module.exports = {
    getDashboardData,
    getMapData
}