const Pool = require('./db')

const getLogin = async (email,password)=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT * FROM admin_user WHERE email = ? AND password = ?',[email,password]);
    promisePool.release();

    // console.log(rows);

    return rows;
};

const getdevicelist = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT * FROM device');
    promisePool.release();

    // console.log(rows);
    return rows;
};

const getdevicestatelist = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT * FROM device_status');
    promisePool.release();

    // console.log(rows);
    return rows;
};


const getpricelist = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT * FROM e_price');
    promisePool.release();

    // console.log(rows);
    return rows;
};

const getMapData = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT id,latitude,longitude,addr FROM device');
    promisePool.release();

    // console.log(rows);
    return rows;
};

const getcharge_amount_history = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT p.pay_num as PAYID, d_id,c_pay,can_pay,pay_by,c_num,c_c_num,pay_day,c_pay_day,c_conn,c_time,c_amount,c_time_s,c_time_e,c_time_u FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num');
    promisePool.release();

    // console.log(rows);
    return rows;
}

const getcharge_daily_list = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT CAST(DATE_ADD(CAST(c.c_time_e as DATETIME),INTERVAL 9 HOUR) as DATE) as day, sum(CAST(c.c_amount as FLOAT)) as amount ,COUNT(c.c_amount) as count, sum(CAST(p.c_pay as UNSIGNED)-CAST(IFNULL(p.can_pay,0) as UNSIGNED)) as pay FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num GROUP BY day ORDER BY day');
    promisePool.release();

    // const [rows] = await promisePool.query('SELECT CAST(c.c_time_e as datetime) as day FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num group by day');
    // console.log(rows);
    return rows;
}

const getcharge_daily_graph = async (StartTime,EndTime)=>
{
    
    const promisePool = await Pool.getConnection();
    // const [rows] = await promisePool.query('SELECT A.n AS time , ifnull(B.amount,0) AS amount, ifnull(B.count,0) AS count,ifnull(B.pay,0) AS pay  FROM (SELECT @N := @N +1 AS n FROM charge_h, (select @N:=-1 from DUAL ) NN LIMIT 24) AS A LEFT JOIN (SELECT Hour(DATE_ADD(CAST(c.c_time_e as DATETIME),INTERVAL 9 HOUR)) as hh, sum(CAST(c.c_amount as FLOAT)) as amount ,COUNT(c.c_amount) as count ,sum(CAST(p.c_pay as UNSIGNED)-CAST(IFNULL(p.can_pay,0) as UNSIGNED)) as pay FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num WHERE DATE_ADD(CAST(c.c_time_e as DATETIME),INTERVAL 9 HOUR) BETWEEN "2023-12-21 00:00:00" AND date_format(now(),"%Y-%m-%d 23:59:59") GROUP BY hh ORDER BY hh) AS B ON A.n = B.hh');
    const [rows] = await promisePool.query('SELECT A.n AS time , ifnull(B.amount,0) AS amount, ifnull(B.count,0) AS count,ifnull(B.pay,0) AS pay  FROM (SELECT @N := @N +1 AS n FROM charge_h, (select @N:=-1 from DUAL ) NN LIMIT 24) AS A LEFT JOIN (SELECT Hour(DATE_ADD(CAST(c.c_time_e as DATETIME),INTERVAL 9 HOUR)) as hh, sum(CAST(c.c_amount as FLOAT)) as amount ,COUNT(c.c_amount) as count ,sum(CAST(p.c_pay as UNSIGNED)-CAST(IFNULL(p.can_pay,0) as UNSIGNED)) as pay FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num WHERE DATE_ADD(CAST(c.c_time_e as DATETIME),INTERVAL 9 HOUR) BETWEEN ? AND ? GROUP BY hh ORDER BY hh) AS B ON A.n = B.hh',[StartTime,EndTime]);
    promisePool.release();

    // const [rows] = await promisePool.query('SELECT CAST(c.c_time_e as datetime) as day FROM charge_h as c RIGHT JOIN pay_h as p  ON c.c_id = p.pay_num group by day');
    // console.log(rows);
    return rows;
}

const getcharge_error_history = async ()=>
{
    const promisePool = await Pool.getConnection();
    await promisePool.query('DELETE FROM device_err WHERE o_time < now() - INTERVAL 1 month')       // 한달 이상 된것 지우기
    const [rows] = await promisePool.query('SELECT * FROM device_err');     // 그외의 것 다 가져오기
    promisePool.release();


    // console.log(rows);
    return rows;
}

const getcharge_publiccode_list = async ()=>
{
    const promisePool = await Pool.getConnection();
    const [rows] = await promisePool.query('SELECT * FROM public_c');    
    promisePool.release();


    // console.log(rows);
    return rows;
}

const insertdevice = async (id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled)=>
{
    // let result = false;
    const promisePool = await Pool.getConnection();

    try{
        const [rows] = await promisePool.query('INSERT INTO device(id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled) VALUES(?,?,?,?,?,?,?,?,?,?)',[id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled]);    
        console.log(rows)
    }catch(e){
        console.log(e)
        return false
    }finally{
        promisePool.release();
    }

    return true

}

const updatedevice = async (id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled)=>
{
    // let result = false;
    const promisePool = await Pool.getConnection();

    try{
        const [rows] = await promisePool.query('UPDATE device SET id =? , latitude =? , longitude =? , addr =? , s_version =? , h_c_m =? , h_p_m =? , h_b_m =? , h_w_m =? , enabled =? WHERE id = ?',[id , latitude , longitude , addr , s_version , h_c_m , h_p_m , h_b_m , h_w_m , enabled, id]);    
        console.log(rows)
    }catch(e){
        console.log(e)
        return false
    }finally{
        promisePool.release();
    }

    return true
}

const removedevice = async (id , latitude , longitude )=>
{
    // let result = false;
    const promisePool = await Pool.getConnection();

    try{
        const [rows] = await promisePool.query('DELETE FROM device WHERE id =? AND latitude =? AND longitude =? ',[id , latitude , longitude]);    
        console.log(rows)
    }catch(e){
        console.log(e)
        return false
    }finally{
        promisePool.release();
    }

    return true
}

module.exports = 
{
    getLogin,
    getdevicelist,
    getdevicestatelist,
    getpricelist,
    getMapData,
    getcharge_amount_history,
    getcharge_daily_list,
    getcharge_daily_graph,
    getcharge_error_history,
    getcharge_publiccode_list,
    insertdevice,
    updatedevice,
    removedevice,
};