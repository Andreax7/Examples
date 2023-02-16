const {pool} = require('../connection.js')
const bcrypt = require('bcryptjs')

async function hashPassword (password) {
  return bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))
}


async function getCredentials(name,pass) {
  const res = await pool.query(`SELECT * FROM admin WHERE name=($1)`,[name])
  const user = res.rows[0] 
  let hash = user.password
  let resp = await bcrypt.compare(pass, hash)
  return resp
  }

async function createAdmin(body) {
  const hashedPassword = await hashPassword(body.password)
    return pool.query(`
    INSERT INTO admin (name, password)
    VALUES ($1, $2)
  `, [body.name, hashedPassword])
}

async function removeAdmin(id) {
    return pool.query(`DELETE FROM admin WHERE id=($1)`,[id])
  }

  async function get(id) {
    return pool.query(`SELECT * FROM admin WHERE id=($1)`,[id])
  }
  async function checkUsername(name) {
    return pool.query(`SELECT * FROM admin WHERE name=($1)`,[name])
  }

module.exports = {
    createAdmin,
    removeAdmin,
    getCredentials,
	  get,
    checkUsername
 
}