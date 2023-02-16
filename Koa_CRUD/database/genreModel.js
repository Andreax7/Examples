const {pool} = require('./index.js')

async function getAll () {
  return pool.query('SELECT * FROM genre')
}

async function remove (id) {
    return pool.query(`DELETE FROM genre WHERE id = ($1)`, [id])
  }
  
  async function create(body) {
    return pool.query(`
      INSERT INTO genre (genre_name)
      VALUES ($1)
    `, [body.genre_name])
  }

  async function getOne(id) {
    return pool.query(`SELECT * FROM genre WHERE id=($1)`,[id])
  }

module.exports = {
  create,
  getAll,
  remove, 
  getOne
}
