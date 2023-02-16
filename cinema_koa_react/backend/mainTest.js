const test = require('ava')
const supertest = require('supertest')

const { pool } = require('./database/connection')
const app = require('./main')

const api = supertest(app.callback())

test.after('cleanup', async t => {
  await pool.end()
})

module.exports = api