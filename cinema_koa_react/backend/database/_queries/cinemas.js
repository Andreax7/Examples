const {pool} = require('../connection.js')

async function getAllCinemas() {
  return pool.query('SELECT * FROM cinema;')
}

async function removeCinema(id) {
    return pool.query(`DELETE FROM cinema WHERE id=($1);`,[id])
  }

  //for checking if exists
async function getOne(id) {
    return pool.query(`SELECT id FROM cinema WHERE id=($1);`,[id])
  }


  async function updateCinema(body,cinemaId) {
    return pool.query(`
      UPDATE "cinema" SET "name" = $1, "location" = $2, "openDays" = $3, "openHours" = $4 WHERE "id" = $5 ; `,
      [body.name, body.location, body.openDays, body.openHours, cinemaId ])
  }
  

async function addCinema(body) {
  return pool.query(`
    INSERT INTO cinema ("name", "location", "openDays", "openHours")
    VALUES ($1, $2, $3, $4);
  `, [body.name, body.location, body.openDays, body.openHours])
}

module.exports = {
    getAllCinemas,
    removeCinema,
    updateCinema,
    addCinema,
    getOne
 
}