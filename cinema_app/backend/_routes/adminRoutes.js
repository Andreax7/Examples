const KoaRouter = require('koa-router')
const { checkFields } = require('../_controller/util')

const { auth } = require('../_controller/auth')
const admin = require('../database/_queries/admin')
const cinema = require('../database/_queries/cinemas')
const projection = require('../database/_queries/projections')

const router = new KoaRouter()

//signup - create admin
router.post('/signup',async ctx => {
        console.log(ctx.request.body.name && ctx.request.body.password)
        let exists = await admin.checkUsername(ctx.request.body.name)
        if( exists.rowCount===1){
            ctx.status = 200
            ctx.body = "User exists"
        }
        else{
            let usr = await admin.createAdmin({ name : ctx.request.body.name, password: ctx.request.body.password})
            if(usr.rowCount===1){
                ctx.status = 200 // OK
                ctx.body = usr
                 return ctx.body
            }
            else{
                ctx.status = 400
                ctx.body = "invalid credentials"
                throw new Error("invalid credentials")
            }  
        }
       
})

//login
router.post('/login',async ctx => {
    try{
        let usr = await admin.checkUsername(ctx.request.body.name)
        const check = await admin.getCredentials(ctx.request.body.name, ctx.request.body.password)
        if (check){
            ctx.body = usr.rows[0]
            ctx.status = 200 // OK
        return ctx.body
        }
        else{
            ctx.status = 200
            ctx.body = "User exists or missing fields"
            return ctx.body
        }
    }catch(err){
        ctx.status = 400
        throw new Error("User exists or missing fields")
    }
   
})

// delete admin
router.delete('/auth/:id', auth, async ctx => {
    try{
        let user = (await admin.get(ctx.params.id)).rows[0]
    //    console.log(user)
        if(user!== undefined){
            ctx.status = 200 //OK 
             return await admin.removeAdmin(ctx.params.id).rowCount    
        }
        else{
            ctx.status = 400
            ctx.body = "Unexisting admin"
            return ctx.body
        }
    }catch(error){
        return error
    }
    
})

//add new cinema
router.post('/cinema', auth, async ctx => {
    try{
        if(checkFields(ctx.request.body)){
                await cinema.addCinema(ctx.request.body)
                    .then( res => {
                        if(res.rowCount>0){
                            ctx.body = ctx.request.body
                            ctx.status = 200 // OK
                            return ctx.body
                        }
                    }).catch(err =>{ return err})
            }
            else{
                ctx.status = 400
                throw new Error("invalid input")
            }
    }catch(error){
        return error
    }
})

//update cinema
router.put('/cinema/:id', auth, async ctx => {
    try{
        let cin = (await cinema.getOne(ctx.params.id)).rows[0]
    
        if(cin && checkFields(ctx.request.body)){
            await cinema.updateCinema(ctx.request.body,ctx.params.id)
            .then((res)=>{
                if(res.rowCount===1){
                    ctx.status = 200 // OK
                    return ctx.body = res.rowCount
                }
                else{
                    ctx.status = 400
                    throw new Error("invalid input")
                }
            })
        }else{
            ctx.status = 400
            throw new Error("invalid input")
        }
    
    }catch(error){
        return error
    }
   
})

// delete cinema
router.delete('/cinema/:id', auth, async ctx => {
    try{
        let cin = (await cinema.getOne(ctx.params.id)).rows[0]
        if(cin.id === undefined){
            ctx.status = 400
            ctx.body = "Unexisting cinema"
        }
        else{
            ctx.status = 200 //OK 
            await cinema.removeCinema(ctx.params.id)
            ctx.body = true
            return ctx.body
            }
    }
    catch(error){
        return error
    } 
    
})

//add projection
router.post('/projection', auth, async ctx => {
    try{
        const adProj = await projection.addProjection(ctx.request.body)
        .then( res => {
                if(res.rowCount === 1){
                ctx.body = res
                ctx.status = 200 // OK
            return ctx.body
            }
        else{
            ctx.status = 400
            throw new Error("invalid input")
        }})
    }catch(error){
        return error
    }
    
})

//update projection
router.put('/projection/:id', auth, async ctx => {
    try{
        let cin = (await projection.projectionDetails(ctx.params.id)).rows[0]
            if(cin){
                await projection.updateProjection(ctx.request.body,ctx.params.id)
                .then((res)=>{
                    ctx.status = 200 // OK
                    return ctx.body = res.rowCount
                }).catch(err=>{
                    throw err
                })
            }
            else{
                ctx.status = 400
                throw new Error("invalid name")
            }
    }catch(error){
        return error
    }
 
})

// delete projection
router.delete('/projection/:id',auth, async ctx => {
    try{
        let pro = (await projection.projectionDetails(ctx.params.id)).rows[0]
       // console.log(pro, ' del ')
        if(pro.id !== undefined){
            ctx.status = 200 //OK 
            ctx.body = (await projection.removeProjection(ctx.params.id)).rowCount
            return ctx.body
        }
        else{
            ctx.status = 400
            ctx.body = "Unexisting projection"
        }
    }catch(error){
        return error
    }
   
})



module.exports = router