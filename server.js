const express = require("express");
const app = express();
const session = require('express-session')
const path = require('path');

//환경변수
require('dotenv').config({ path:path.join(__dirname,'./.env') });
const port = process.env.PORT || 5005;

const mysqlstore = require('express-mysql-session')(session)
const option = require('./db/dboption')

 
 const mysqlsessionstore = new mysqlstore(option.sessionconfig)
 
 app.use(session({
    // secure: true, // https 환경에서만 session 정보를 주고받도록 처리
    secret: option.SS_SECRET,
    resave: false,                  // true : session변경사항이 없을때에도 계속 저장함
    saveUninitialized: false,       // true : 페이지 방문시마다 새로운 session 추가. 방문수에 따라 등급을 정할때 쓰임
    cookie: {
       secure: false,
       maxAge:3600000
    },
    store:mysqlsessionstore
 }))


//http post 요청 읽기
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const cors = require("cors")
app.use(cors({
    origin:"http://localhost:5000",
    credentials:true
}))


const monitoring = require('./routes/monitoring')
const auth_routes = require('./routes/auth')
const charge_management = require('./routes/charge-management')
const analysis = require('./routes/analysis')
const setting = require('./routes/setting')

app.use('',auth_routes)
app.use('',monitoring)  // 모니터링
app.use('',charge_management)   // 충전관리
app.use('',analysis)    // 정산/지표분석
app.use('',setting)     // 환경설정


// app.get("/", (req, res)=>{

//     console.log("access admin");

//     res.sendStatus(200); 
// })


app.listen(port, function () {
    console.log("server listening on port "+port)
})