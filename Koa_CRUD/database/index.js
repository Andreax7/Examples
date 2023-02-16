require('dotenv/config')

const {Pool} = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function transaction (fn) {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}

pool.query('SELECT NOW()')
.then(() => {
  console.log('Connected to database!')
})
.catch(err => {
  console.error(err)
})

module.exports = {
  pool,
  transaction
}
