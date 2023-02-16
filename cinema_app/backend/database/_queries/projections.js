const {pool} = require('../connection.js')

async function getAllProjections() {
  return pool.query('SELECT * FROM projection ;')
}

async function projectionDetails(id) {
  return pool.query('SELECT * FROM projection WHERE "id" = ($1) ;' , [id])
}

async function ProjectionsOfCinema(cinemaid) {
    return pool.query('SELECT * FROM projection WHERE "cinemaid" = ($1) ;', [cinemaid])
  }

async function ProjectionsByCategory(categoryId) {
    return pool.query('SELECT * FROM projection WHERE "category" = ($1) ;', [categoryId] )
}

async function ProjectionsByDay(day) {
    return pool.query('SELECT * FROM projection WHERE "day" = ($1) ;', [day] )
}

async function ProOfCinemaByCategory(cinemaId, categoryId) {
    return pool.query('SELECT * FROM projection WHERE "cinemaid" = ($1) AND "category" = ($2) ;', [cinemaId,categoryId] )
}


// ******** ADMIN ROUTES ***********
//**********************************/
async function removeProjection(id) {
    return pool.query(`DELETE FROM projection WHERE "id"=($1) ;`,[id])
}

async function updateProjection(body, id) {
    return pool.query(`
      UPDATE "projection" SET "cinemaid" = $1, "category" = $2, "title" = $3, "duration" = $4, "day" = $5, "time" = $6 WHERE "id" = $7 ; `,
      [body.cinemaid, body.category, body.title, body.duration, body.day, body.time, id ])
}
  

async function addProjection(body){
  return pool.query(`
    INSERT INTO projection ("cinemaid", "category", "title", "duration", "day", "time" )
    VALUES ($1, $2, $3, $4, $5, $6) ;
  `, [body.cinemaid, body.category, body.title, body.duration, body.day, body.time])
}

module.exports = {
    addProjection,
    getAllProjections,
    projectionDetails,
    ProjectionsOfCinema,
    ProjectionsByCategory,
    ProjectionsByDay,
    ProOfCinemaByCategory,
    removeProjection,
    updateProjection,
   
}