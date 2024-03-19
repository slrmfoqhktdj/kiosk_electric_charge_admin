const db = require('./db')

const getLogin = async (email,password)=>
{
    const promisePool = db.promise();
    const [rows] = await promisePool.query('SELECT * FROM admin_user WHERE email = ? AND password = ?',[email,password]);
    console.log(rows);
    return rows;
};

const getdevicelist = async ()=>
{
    const promisePool = db.promise();
    const [rows] = await promisePool.query('SELECT * FROM device');
    // console.log(rows);
    return rows;
};

const getdevicestatelist = async ()=>
{
    const promisePool = db.promise();
    const [rows] = await promisePool.query('SELECT * FROM device_status');
    // console.log(rows);
    return rows;
};


const getpricelist = async ()=>
{
    const promisePool = db.promise();
    const [rows] = await promisePool.query('SELECT * FROM e_price');
    // console.log(rows);
    return rows;
};

const getcharge_amount_history = async ()=>
{
    const promisePool = db.promise();
    const [rows] = await promisePool.query('SELECT p.pay_num as PAYID, d_id,c_pay,can_pay,pay_by,c_num,c_c_num,pay_day,c_pay_day,c_conn,c_time,c_amount,c_time_s,c_time_e,c_time_u FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num');
    // console.log(rows);
    return rows;
}

module.exports = 
{
    getLogin,
    getdevicelist,
    getdevicestatelist,
    getpricelist,
    getcharge_amount_history
};