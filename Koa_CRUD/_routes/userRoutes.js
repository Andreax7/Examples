const KoaRouter = require('koa-router')
const { authAdmin, authUser } = require('../authMiddleware.js')
const users = require('../database/user_query')

const router = new KoaRouter()

//signup - create user
router.post('/signup', async ctx => {
    const user = { username : ctx.request.body.username, password: ctx.request.body.password, role:ctx.request.body.role}
    if (user.username && user.password && user.role){
        ctx.status = 200 // OK
        return await users.createUser(user)

    }
    else{
        ctx.status = 400
        throw new Error("invalid credentials")
    }
   
})

//login-admin
router.get('/auth/:username', authAdmin, async ctx => {
    try{
        let user = (await users.getUser(ctx.params.username)).rows[0]
        console.log(user)
        ctx.status = 200 // OK
        return ctx.body = user
    }
    catch(err){
        return err
    }       
})

//login-user
router.get('/user/:username', authUser, async ctx => {
    console.log(ctx.body)
        let user = (await users.getUser(ctx.params.username)).rows[0]
        ctx.status = 200 // OK
        ctx.body = user
        return ctx.body
})
// delete user
router.delete('/auth/:id', authAdmin, async ctx => {
    let user = (await users.get(ctx.params.id)).rows[0]
    if(user){
        ctx.status = 200 //OK 
        ctx.body = await users.remove(ctx.params.id)
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting user"
    }
})

//Update user
router.post('/user/update/:id', authUser, async ctx => {
    let user = (await users.get(ctx.params.id)).rowCount
    if(user === 1){
        ctx.status = 200 //OK 
        await users.updateUserPass(ctx.params.id, ctx.request.body).then((res)=>{
            if(res.rowCount===1){
                ctx.status = 200 // OK
            }
        })
        ctx.body = (await users.get(ctx.params.id)).rows[0]
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting user"
    }
    return ctx.body
})

module.exports = router