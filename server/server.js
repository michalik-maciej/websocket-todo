const 
  express = require('express'),
  socket = require('socket.io'),
  path = require('path')

const 
  app = express()

app.use(express.static(path.join(__dirname, '../client')))

const server = app.listen(8000, () => {
  console.log('server is listening on port 8000')
})

const io = socket(server)
