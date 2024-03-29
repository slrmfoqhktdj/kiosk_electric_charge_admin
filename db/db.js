const mysql = require('mysql2');

const option = require('./dboption')


const pool = mysql.createPool(option.dbconfig).promise();


// function getConnection(callback) {
//     pool.getConnection(function (err, conn) {
//       if(!err) {
//         callback(conn);
//       }
//     });
// }
// // db.connect();


module.exports = pool;