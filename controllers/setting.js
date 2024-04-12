const fs = require('fs');

const getPublicCode = async (request, response, next) => {
    console.log('c_getPublicCode')

    let result = []
    
    const jsonFile = fs.readFileSync(__dirname+'/../jsonfiles/publiccode.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);

    const rows = jsonData.item;

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