const KoaRouter = require('koa-router')
const parse = require('co-body')

const cinema = require('../database/_queries/cinemas')
const projection = require('../database/_queries/projections')
const categories = require('../database/_queries/categories')

const router = new KoaRouter()

//get all cinemas
router.get('/cinema', async ctx => {
    try{
        await cinema.getAllCinemas()
                .then((res)=>{
                    ctx.body = res.rows
                    ctx.status = 200 // OK
                    return ctx.body
                })
    }catch(err){
        throw(err)
    }
        
})

// get Projections
router.get('/projection', async ctx=> {
    try{
        await projection.getAllProjections() 
        .then((res)=>{
            if(res.rowCount === 0) return ctx.body = []
            else{
                    ctx.body = res.rows
                    ctx.status = 200 // OK
                    return ctx.body
            }
        })
    }
    catch(err){
        throw err
    }
})

// get Categories
router.get('/categories', async ctx=> {
    try{
        await categories.getCategories().then((res)=>{
             ctx.body = res.rows
             ctx.status = 200 // OK
             return ctx.body
         })
    }
    catch(err){
        throw err
    }
 })
 
 
//all projections of the cinema
router.get('/cinema/:id/projection', async ctx => {
    try{
        let proj = await projection.ProjectionsOfCinema(ctx.params.id)
        if(proj.rowCount > 0){
            ctx.body = proj.rows
            ctx.status = 200 // OK
        return ctx.body
        }
        else{
            ctx.status = 404
            throw new Error("no projections of this cinema")
        }
    }
    catch(err){
        throw err
    }
})


//get One Projection / see details
router.get('/projection/:id', async ctx => {
    try{
        await projection.projectionDetails(ctx.params.id)
        .then((res)=>{
            if(res.rowCount!=0){
                ctx.body = res.rows[0] 
                ctx.status = 200 // OK
                return ctx.body
            }
            else{
                ctx.status = 400
                throw new Error("Unexsisting Projection") 
            }
        })
    }
    catch(err){
        throw err
    }
})

// all projections in category
router.get('/projection/category/:id', async ctx => {
    try{
        let cat = (await projection.ProjectionsByCategory(ctx.params.id))
        if(cat.rowCount > 0){
            ctx.status = 200 //OK 
            ctx.body = cat.rows
        }
        else{
            ctx.status = 400
            ctx.body = "No projection under this category"
            throw new Error("No projection under this category")
        }
    }
    catch(err){
        throw err
    } 
})

/*/all projections of the cinema by category (not used)

router.get('/projection/:category/:cinema', async ctx => {
    try{
        let proj = await projection.ProOfCinemaByCategory(ctx.params.cinema,ctx.params.category)
        if(proj.rowCount > 0){
            ctx.body = proj.rows
            ctx.status = 200 // OK
            return ctx.body
        }
        else{
            ctx.status = 400
            throw new Error("No projections")
        }
    }
    catch(err){
        throw err
    }
})
*/

//Projections on the day
router.get('/projections/day/:d', async ctx => {
    try{
        let getByDay = await projection.ProjectionsByDay(ctx.params.d)
        if(getByDay.rowCount > 0){
            ctx.body = getByDay.rows
            ctx.status = 200 // OK
            return ctx.body
        }
        else{
            ctx.status = 400
            throw new Error("No projections on that date")
        }
    }
    catch(err){
        throw err
    }
})


module.exports = router