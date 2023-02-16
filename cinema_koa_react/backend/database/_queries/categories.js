const {pool} = require('../connection.js')

async function getCategories() {
  return pool.query('SELECT * FROM category')
}

module.exports = {
    getCategories
}