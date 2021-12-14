const 
  express = require('express'),
  socket = require('socket.io'),
  path = require('path')

const app = express()
let tasks = []

app.use(express.static(path.join(__dirname, '../client')))

function updateData(newData) {
  tasks = newData
}

const server = app.listen(8000, () => {
  console.log('server is listening on port 8000')
})

const io = socket(server)

io.on('connection', (socket) => {
  console.log(`connection from ${socket.id}, sending tasks to init on client side \n`)
  socket.emit('updateData', tasks)

  socket.on('addTask', (task) => {
    tasks.push(task)
    socket.broadcast.emit('addTask', task)
  })
  
  socket.on('removeTask', (taskId) => {
    updateData(tasks.filter(item => item.id !== taskId))
    socket.broadcast.emit('removeTask', taskId)
  })
})
