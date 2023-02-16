const base64url = require('base64url')
const user = require('./database/user_query')

async function authAdmin(ctx, next) {

    const encoded = ctx.header['authorization'].split(' ')[1]
    const decoded = base64url.decode(encoded)
    const [username, password] = decoded.split(':') 
    let usr = (await user.getCredentials(username,password))
    if (usr.rows[0].role === "admin") {
      return next()
    }
    else{
        throw new Error('Wrong Credentials')
    }
 }  

 async function authUser(ctx, next) {

    const encoded = ctx.header['authorization'].split(' ')[1]
    const decoded = base64url.decode(encoded)
    const [username, password] = decoded.split(':') 
    let usr = (await user.getCredentials(username,password))
    if (usr.rows[0].role === "user") {
      return next()
    }
    else{
        throw new Error('Wrong Credentials')
    }
 }  
  

module.exports = {
    authAdmin,
    authUser,
   
}
