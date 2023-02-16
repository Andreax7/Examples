const {pool} = require('./index.js')
const bcrypt = require('bcryptjs')

async function hashPass(password) {
  return bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))
}

async function getCredentials(uname,pass) {
  const res = await pool.query(`SELECT * FROM users WHERE username=($1)`,[uname])
  const user = res.rows[0]
  let hash = user.password
  let resp = await bcrypt.compare(pass, hash)
  if(resp){
    return res
  }
  else{
    throw new Error("Wrong credentials")
  }
  }

async function createUser(body) {
  const hashedPassword = await hashPass(body.password)
    return pool.query(`
    INSERT INTO users ("username", "password", "role")
    VALUES ($1, $2, $3)
  `, [body.username, hashedPassword, body.role])
}

async function remove(id) {
    return pool.query(`DELETE FROM users WHERE id=($1)`,[id])
  }

  async function get(id) {
    return pool.query(`SELECT * FROM users WHERE id=($1)`,[id])
  }

  async function getUser(username) {
    return pool.query(`SELECT * FROM users WHERE username=($1)`,[username])
  }
  async function updateUserPass(userId, body) {
    const hashedPassword = await hashPass(body.password)
    return pool.query(`
      UPDATE "users" SET "username" = $1, "password" = $2 WHERE "id" = $3; `,
      [body.username, hashedPassword, userId ])
  }
  

module.exports = {
    createUser,
    remove,
    get,
    getUser,
    getCredentials,
    updateUserPass
 
}