const {pool} = require('./index.js')

async function getAll () {
  return pool.query('SELECT * FROM songs')
}

async function get (id) {
  return pool.query(`SELECT * FROM songs WHERE id = ($1)`,[id] )
}

async function remove (id) {
    return pool.query(`DELETE FROM songs WHERE id = ($1)`, [id])
  }

async function create(body,autorId) {
  return pool.query(`
    INSERT INTO songs (title, len, autorId, genres )
    VALUES ($1, $2, $3, $4)
  `, [body.title, body.len, autorId, body.genres ])
}

async function getByGenre(genre) {
  return pool.query(`SELECT * FROM songs WHERE genres = ($1)`,[genre] )
}

module.exports = {
  create,
  get,
  getAll,
  getByGenre,
  remove
}
