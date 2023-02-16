const {pool} = require('./index.js')

async function getAll () {
  return pool.query('SELECT * FROM autori')
}

async function get(id) {
  return pool.query(`SELECT * FROM autori WHERE id=($1)`,[id])
}

async function remove(id) {
    return pool.query(`DELETE FROM autori WHERE id=($1)`,[id])
  }

async function create(body) {

  return pool.query(`
    INSERT INTO autori (name)
    VALUES ($1)
    RETURNING id
  `, [body.name])
}

module.exports = {
  create,
  get,
  getAll,
  remove
}