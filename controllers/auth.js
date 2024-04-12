const bcrypt = require('bcrypt')
const axios = require('axios')
require('dotenv').config({ path:'../.env'});



// sign up user
const signup = async (request, response, next) =>{
    console.log('c_auth signup')
    let userInfo = {
        name : request.body.name,
        email: request.body.email
    }
    let hashedPassword = ''
    if(request.body.password !== ''){
         hashedPassword = await bcrypt.hash(request.body.password,12)
    }
    let user = new User({...userInfo, password:hashedPassword})
    await user.save().then(()=>{
        request.session.user = userInfo
        request.session.save()
        response.redirect(response.locals.base + 'dashboard/demo-one/' + response.getLocale())
    }).catch(error=>{
        response.render('../views/auth/register',{
            title:'Register',
            name:'register',
            layout:'../views/auth/auth_layout.ejs',
            errors:error.errors,
            input:{
                name:request.body.name,
                email:request.body.email,
                password:request.body.password
            }
        })
    })    
}



// check if the user is guest
const isGuest = (request, response) => {
    const sendGuestData = {isGuest:false};

    console.log('Check Login')
    if(request.session.user){
        
        sendGuestData.isGuest = true
    }else{
        sendGuestData.isGuest = false
    }
    return response.send(sendGuestData)
}

// authenticate user
const authenticate = async (request, response, next) => {
    console.log('c_auth authenticate')

    const email = request.body.email
    const password = request.body.password

    const sendAuthenticateData = {
        isLogin:false,
        errorMessage :""
    };

    if(email && password){
        // const rows = await dbc.getLogin(email,password);

        try{
            comfirm = await axios({
                method:'POST',
                url:process.env.OCPPURL.concat('/login'),
                data: {
                    email: email,
                    pwd: password
                } 
            })
        }catch(e){
            console.log("err : "+e);
        }

        const data = comfirm.data.item

        if(data != null && data.length>0){
            let userInfo = {
                name:data[0].name,
                email:data[0].email
            }

            request.session.user = userInfo
            request.session.save()
            sendAuthenticateData.isLogin = true
            response.send(sendAuthenticateData)
        }else{
            sendAuthenticateData.isLogin = false
            sendAuthenticateData.errorMessage = "일치하는 아이디가 없습니다"
            response.send(sendAuthenticateData)
        }

        
        
    }else{
        // request.session.errorMessage = "정보를 입력해주세요"
        sendAuthenticateData.isLogin = false
        sendAuthenticateData.errorMessage = "정보를 입력해주세요"
        response.send(sendAuthenticateData)
        // response.redirect(response.locals.base)
    }


       
}

// sign out user
const signOut = (request, response, next) => {
    console.log('c_auth signout')

    request.session.destroy()
    return response.redirect(response.locals.base)
}



module.exports = {
    isGuest,
    signup,
    authenticate,
    signOut
}