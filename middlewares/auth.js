// check if the user is authenticated


const isAuthenticated = (request, response, next) => {
    if(!request.session.user){
        console.log("auth")
        // return response.status(400)

        return response.send(401)
    }
    
    next()
}



const isLogin = (request, response, next) => {
    if(request.session.user){
        console.log("auth")
        // return response.status(400)

        return response.send({
            isLogin:true,
            errorMessage :""
        })
    }
    
    next()
}

// // check if the user is guest
// const isGuest = (request, response, next) => {

//     console.log('loginpage')
//     if(request.session.user){
//         return response.redirect(response.locals.base + 'dashboard/demo-one/' + response.getLocale())
//         // sendGuestData.isGuest = true
//         // return response.send(sendGuestData)
//     }
//     next()
// }



module.exports = {
    isLogin,
    isAuthenticated,
}