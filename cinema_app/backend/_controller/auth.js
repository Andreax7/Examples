const base64url = require('base64url')
const admin = require('../database/_queries/admin')

async function auth(ctx, next) {

    const encoded = ctx.header['authorization'].split(' ')[1]
    const decoded = base64url.decode(encoded)
    const [username, password] = decoded.split(':') 
    let user = (await admin.getCredentials(username,password))
    if (user) {
      return next()
    }
    else{
        throw new Error('Wrong Credentials')
    }
 }  
  

module.exports = {
    auth
}
