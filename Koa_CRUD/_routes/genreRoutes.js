const KoaRouter = require('koa-router')
const parse = require('co-body');

const genreM = require('../database/genreModel')

const router = new KoaRouter()

// dohvati sve zanrove
router.get('/genre', async ctx => {
    ctx.status = 202
    ctx.body = (await genreM.getAll()).rows
})

//dodaj zanr
router.post('/genre', async ctx => {
    if (ctx.request.body.genre_name){
        ctx.status = 202
        await genreM.create(ctx.request.body)
        ctx.body = ctx.request.body
    return ctx.body
    }
    else{
        ctx.status = 400
        throw new Error("invalid name")
    }
})

//izbrisi zanr 
router.delete('/genre/:id', async ctx => {
    let genre = (await genreM.getOne(ctx.params.id)).rows[0]
    if(genre){
        ctx.status = 202 //accepted
        ctx.body = await genreM.remove(ctx.params.id)
    }
    else{
        ctx.status = 400 //bad request
        ctx.body = "Unexisting genre"
    }
  })

module.exports = router