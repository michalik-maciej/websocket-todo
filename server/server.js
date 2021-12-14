const 
  express = require('express'),
  socket = require('socket.io'),
  path = require('path')

const 
  app = express(),
  tasks = [`Drink coffee`, `Eat pieguski`]

app.use(express.static(path.join(__dirname, '../client')))

const server = app.listen(8000, () => {
  console.log('server is listening on port 8000')
})

const io = socket(server)

io.on('connect', (socket) => {
  console.log(`connection from ${socket.id}, sending tasks to init on client side`)
  socket.emit('updateData', tasks)

  socket.on('addTask', (task) => {
    tasks.push(task)
    socket.broadcast.emit('updateData', tasks)
  })
  
  socket.on('removeTask', (taskIndex) => {
    tasks.splice(taskIndex, 1)
    console.log(tasks)
    socket.broadcast.emit('updateData', tasks)
  })
})
