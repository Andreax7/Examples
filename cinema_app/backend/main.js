//require('dotenv/config')


require('dotenv/config')
require('./database/connection')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const PORT = process.env.PORT_BC

app.use(bodyParser());
const cors = require('koa-cors')


app.use(cors()) 
app.use(bodyParser())

app.use(require('./_routes/adminRoutes.js').routes())
app.use(require('./_routes/allUsersRoutes.js').routes())

app.listen(PORT, err => {
    if(err) {
      console.log(err); 
      return
    }
    console.log(`Server listening on port: ${PORT}`);
  });

  module.exports =  app  


  