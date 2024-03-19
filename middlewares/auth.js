// check if the user is authenticated


const isAuthenticated = (request, response, next) => {
    if(!request.session.user){
        return response.redirect(response.locals.base)
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

module.exports = {
    isAuthenticated,
    isGuest
}