const KoaRouter = require('koa-router')
const parse = require('co-body');

const { authAdmin } = require('../authMiddleware')

const autorM = require('../database/autorModel')

const router = new KoaRouter()

//dodaj autora
router.post('/autors', async ctx => {
    if (ctx.request.body.name){
        ctx.status = 200 // OK
        
        ctx.body = await autorM.create(ctx.request.body)
        //console.log(ctx.request.body)
    return ctx.body
    }
    else{
        ctx.status = 400
        throw new Error("invalid name")
    }
   
})

//dohvati sve autore
router.get('/autors', async ctx=> {
    ctx.body = (await autorM.getAll()).rows
})


// dohvati autora
router.get('/autors/:id', async ctx => {
    let user = (await autorM.get(ctx.params.id)).rows[0]
    if(user){
        ctx.status = 200 // OK
        ctx.body = (await autorM.get(ctx.params.id)).rows[0]
        return ctx.body
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting author"
    }
})

// izbriši autora
router.delete('/autors/:id', authAdmin, async ctx => {
    let user = (await autorM.get(ctx.params.id)).rows[0]
    if(user){
        ctx.status = 200 //OK 
        ctx.body = await autorM.remove(ctx.params.id)
    }
    else{
        ctx.status = 400
        ctx.body = JSON.stringify("Unexisting author")
    }
    }
)

module.exports = router