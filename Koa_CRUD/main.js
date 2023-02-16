require('dotenv/config')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const PORT = process.env.PORT_BCKND

app.use(bodyParser());

//app.use(require('./routes.js').routes())
app.use(require('./_routes/songRoutes.js').routes())
app.use(require('./_routes/userRoutes.js').routes())
app.use(require('./_routes/autorRoutes.js').routes())
app.use(require('./_routes/genreRoutes.js').routes())
  
app.listen(PORT, err => {
    if(err) {
      console.log(err); 
      return
    }
    console.log(`Server listening on port: ${PORT}`);
  });

  module.exports = app 
  