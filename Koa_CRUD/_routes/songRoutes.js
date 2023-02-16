const KoaRouter = require('koa-router')
const parse = require('co-body');

const songM = require('../database/songModel')

const router = new KoaRouter()

// dohvati sve pjesme
router.get('/songs', async ctx => {
    ctx.status = 202
    ctx.body = (await songM.getAll()).rows
})

// dohvati pjesmu
router.get('/songs/:id', async ctx => {
     let song = (await songM.get(ctx.params.id)).rows[0]
    if(song){
        ctx.status = 202
        ctx.body = (await songM.get(ctx.params.id)).rows[0]
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting song"
    }

})

// dohvati pjesme pod zanrom
router.get('/songs/genre/:genre', async ctx => {
    let song = (await songM.getByGenre(ctx.params.genre)).rows
    console.log(song)
    if(song){
        ctx.status = 202
        ctx.body = (await songM.getByGenre(ctx.params.genre)).rows
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting song"
    }
})
// dodaj pjesmu
router.post('/songs/autors/:autorId', async ctx => {
   // console.log(ctx.request.body)
    ctx.body = await songM.create(ctx.request.body, ctx.params.autorId)
    return ctx.status
})

// izbriši pjesmu
router.delete('/songs/:id', async ctx => {
    let song = (await songM.get(ctx.params.id)).rows[0]
   // console.log(await songM.get(ctx.params.id))
    if(song){
        ctx.status = 202
        ctx.body = await songM.remove(ctx.params.id)
    }
    else{
        ctx.status = 400
        ctx.body = "Unexisting song"
    }
})

module.exports = router