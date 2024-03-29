const dbc = require('../db/dbc')

const getPublicCode = async (request, response, next) => {
    console.log('c_getPublicCode')

    let result = []

    const rows = await dbc.getcharge_publiccode_list()

    for(i = 0; i < rows.length; i ++){
        const sendPublicCodeData ={
            id: rows[i].id,
            code : rows[i].code,
            content:rows[i].content,
        }

        result.push(sendPublicCodeData)
    }

    response.send(result);
}


module.exports = {
    getPublicCode
}