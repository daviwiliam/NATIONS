const express = require('express')
const nationRoute = require('./routes/nationRoute')
const conn = require('./db/conn')

const app = express()

app.use('/nations', nationRoute)

conn
  .sync()
  .then(() => {
    app.listen(3000)
    console.log('Server start')
  })
  .catch((err) => console.log(err))